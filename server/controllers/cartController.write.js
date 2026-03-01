/**
 * cartController.write.js
 * POST request handler for /api/cart endpoints.
 *
 * Handlers:
 *  - addItemToCart  POST /api/cart/items
 *
 * @module cartController.write
 */

import prisma from '../lib/prisma.js';
import CartModel from '../models/cartModel.js';
import {
  resolveUserId,
  buildCartPayload,
  sendInternalError,
  enforceCartLimit,
  VALID_PRODUCT_TYPES,
} from './cartController.helpers.js';

/**
 * @desc    Add item to cart
 * @route   POST /api/cart/items
 * @access  Private
 */
export const addItemToCart = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    if (!Number.isFinite(userId)) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }

    const { certification_id, product_type, quantity } = req.body;

    // --- Input validation ---

    if (!certification_id || !product_type) {
      return res.status(400).json({
        success: false,
        error: 'certification_id and product_type are required',
      });
    }

    // --- Quantity validation ---

const parsedQuantity = quantity === undefined ? 1 : parseInt(quantity, 10);

if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
  return res.status(400).json({
    success: false,
    error: 'Quantity must be a positive integer',
  });
}

const MAX_CART_QUANTITY = 10;

if (parsedQuantity > MAX_CART_QUANTITY) {
  return res.status(400).json({
    success: false,
    error: `Maximum ${MAX_CART_QUANTITY} items allowed per product`,
  });
}

    const certificationId = parseInt(certification_id, 10);
    if (!Number.isFinite(certificationId) || certificationId <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid certification_id. Must be a positive integer.',
      });
    }

    if (!VALID_PRODUCT_TYPES.includes(product_type)) {
      return res.status(400).json({
        success: false,
        error: `Invalid product_type. Must be one of: ${VALID_PRODUCT_TYPES.join(', ')}`,
      });
    }

    // --- Business rule validation (reads only — safe outside the transaction) ---

    const certification = await CartModel.findCertificationById(certificationId);
    if (!certification) {
      return res.status(404).json({ success: false, error: 'Certification not found' });
    }

    if (!certification.status_active) {
      return res.status(400).json({ success: false, error: 'Certification is not active' });
    }

    // --- Cart resolution (read — safe outside the transaction) ---

    let cart = await CartModel.findActiveCart(userId);
    if (!cart) {
      cart = await CartModel.createCart(buildCartPayload(req, userId));
    }

    // --- Issue 1: Cart size / DoS guard ---
    // Checked before opening the transaction so we reject early without
    // holding any DB locks for an avoidable 400 response.

    const limitHit = enforceCartLimit(cart, res);
    if (limitHit) return;

    // --- Duplicate guard (read — safe outside the transaction) ---

    const existingItem = await CartModel.findCartItem(cart.cart_id, certificationId, product_type);
    if (existingItem) {
      return res.status(400).json({ success: false, error: 'Item already exists in cart' });
    }

    // --- Issue 2: Atomic persistence via Prisma transaction ---
    //
    // All three writes (insert cart_item → bump cart timestamp → re-fetch cart)
    // execute inside a single $transaction so a mid-flight failure leaves the
    // database in a consistent state rather than a partially-written one.
    //
    // Reads above are intentionally outside the TX — they are read-only and
    // keeping them outside minimises the time locks are held.

    const { cartItem, updatedCart } = await prisma.$transaction(async (tx) => {
      // 1. Insert the new line-item.
      const cartItem = await tx.cart_items.create({
        data: {
          cart_id:          cart.cart_id,
          certification_id: certificationId,
          product_type,
          quantity:         parsedQuantity,
          created_by:       userId,
        },
      });

      // 2. Bump updated_at on the parent cart so clients can detect staleness.
      await tx.carts.update({
        where: { cart_id: cart.cart_id },
        data:  { updated_at: new Date() },
      });

      // 3. Re-fetch the full cart (with items) so totals are accurate.
      const updatedCart = await tx.carts.findUnique({
        where:   { cart_id: cart.cart_id },
        include: { cart_items: true },
      });

      return { cartItem, updatedCart };
    });

    const cartWithTotals = CartModel.calculateTotals(updatedCart);

    return res.status(201).json({
      success:   true,
      message:   'Item added to cart successfully',
      cart_item: cartItem,
      cart:      cartWithTotals,
    });

  } catch (error) {
    // Prisma unique-constraint violation — race condition where two concurrent
    // requests slip past the duplicate guard at the same instant.
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, error: 'Item already exists in cart' });
    }

    // Issue 4: Pass structured context so production logs include userId / requestId.
    sendInternalError(res, 'Failed to add item to cart', error, {
      userId:    resolveUserId(req),
      requestId: req.headers['x-request-id'] ?? null,
    });
  }
};