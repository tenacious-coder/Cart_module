/**
 * cartController.write.js
 * POST request handler for /api/cart endpoints.
 *
 * Handlers:
 *  - addItemToCart  POST /api/cart/items
 *
 * @module cartController.write
 */

import CartModel from '../models/cartModel.js';
import {
  resolveUserId,
  buildCartPayload,
  sendInternalError,
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

    const { certification_id, product_type } = req.body;

    // --- Input validation ---

    if (!certification_id || !product_type) {
      return res.status(400).json({
        success: false,
        error: 'certification_id and product_type are required',
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

    // --- Business rule validation ---

    const certification = await CartModel.findCertificationById(certificationId);
    if (!certification) {
      return res.status(404).json({ success: false, error: 'Certification not found' });
    }

    if (!certification.status_active) {
      return res.status(400).json({ success: false, error: 'Certification is not active' });
    }

    // --- Cart resolution ---

    let cart = await CartModel.findActiveCart(userId);
    if (!cart) {
      cart = await CartModel.createCart(buildCartPayload(req, userId));
    }

    // --- Duplicate guard ---

    const existingItem = await CartModel.findCartItem(cart.cart_id, certificationId, product_type);
    if (existingItem) {
      return res.status(400).json({ success: false, error: 'Item already exists in cart' });
    }

    // --- Persist ---

    const cartItem = await CartModel.addCartItem({
      cart_id: cart.cart_id,
      certification_id: certificationId,
      product_type,
      quantity: 1,
      created_by: userId,
    });

    // Bump updated_at on the parent cart.
    await CartModel.updateCartTimestamp(cart.cart_id);

    // Re-fetch the full cart so totals are accurate after the new item.
    const updatedCart = await CartModel.getCartById(cart.cart_id);
    const cartWithTotals = CartModel.calculateTotals(updatedCart);

    return res.status(201).json({
      success: true,
      message: 'Item added to cart successfully',
      cart_item: cartItem,
      cart: cartWithTotals,
    });

  } catch (error) {
    // Prisma unique-constraint violation — race condition where two concurrent
    // requests slip past the duplicate guard at the same instant.
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, error: 'Item already exists in cart' });
    }
    sendInternalError(res, 'Failed to add item to cart', error);
  }
};