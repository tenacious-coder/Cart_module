/**
 * cartController.delete.js
 * DELETE request handlers for /api/cart endpoints.
 */

import prisma from '../lib/prisma.js'; // ✅ Use shared Prisma instance
import CartModel from '../models/cartModel.js';
import {
  resolveUserId,
  sendInternalError,
} from './cartController.helpers.js';

/**
 * REMOVE ITEM FROM CART
 */
export const removeItemFromCart = async (req, res) => {
  try {
    // ✅ Authentication check
    const userId = resolveUserId(req);
    if (!Number.isFinite(userId)) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    // ✅ Validate cartItemId
    const cartItemId = Number.parseInt(req.params.cartItemId, 10);
    if (!Number.isFinite(cartItemId) || cartItemId <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Cart item ID must be a positive integer.',
      });
    }

    // ✅ Fetch cart item with ownership relation
    const cartItem = await CartModel.findCartItemById(cartItemId);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        error: 'Cart item not found',
      });
    }

    // Defensive check in case relation not included
    if (!cartItem.carts || !Number.isFinite(cartItem.carts.user_id)) {
      return res.status(500).json({
        success: false,
        error: 'Cart relationship data missing',
      });
    }

    // ✅ Ownership validation
    if (cartItem.carts.user_id !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized to remove this item',
      });
    }

    const cartId = cartItem.cart_id;

    // ✅ Atomic transaction
    await prisma.$transaction(async (tx) => {
      await CartModel.removeCartItem(cartItemId, tx);
      await CartModel.updateCartTimestamp(cartId, tx);
    });

    // ✅ Fetch updated cart safely
    const updatedCart = await CartModel.getCartById(cartId);

    const cartWithTotals = updatedCart
      ? CartModel.calculateTotals(updatedCart)
      : null;

    return res.json({
      success: true,
      message: 'Item removed successfully',
      cart: cartWithTotals,
    });

  } catch (error) {
    // Prisma record not found (race condition safe handling)
    if (error?.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'Cart item not found',
      });
    }

    return sendInternalError(res, 'Failed to remove item', error);
  }
};


/**
 * CLEAR CART
 */
export const clearCart = async (req, res) => {
  try {
    // ✅ Authentication check
    const userId = resolveUserId(req);
    if (!Number.isFinite(userId)) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    // ✅ Fetch active cart for this user only
    const cart = await CartModel.findActiveCart(userId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'No active cart found',
      });
    }

    let deletedCount = 0;

    // ✅ Atomic transaction
    await prisma.$transaction(async (tx) => {
      const result = await CartModel.clearCartItems(cart.cart_id, tx);
      deletedCount = result?.count ?? 0;

      await CartModel.updateCartTimestamp(cart.cart_id, tx);
    });

    // Optional: Return updated empty cart for consistency
    const updatedCart = await CartModel.getCartById(cart.cart_id);

    const cartWithTotals = updatedCart
      ? CartModel.calculateTotals(updatedCart)
      : null;

    return res.json({
      success: true,
      message: 'Cart cleared successfully',
      deleted_count: deletedCount,
      cart: cartWithTotals,
    });

  } catch (error) {
    return sendInternalError(res, 'Failed to clear cart', error);
  }
};