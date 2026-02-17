/**
 * cartController.delete.js
 * DELETE request handlers for /api/cart endpoints.
 *
 * Handlers:
 *  - removeItemFromCart  DELETE /api/cart/items/:cartItemId
 *  - clearCart           DELETE /api/cart/clear
 *
 * @module cartController.delete
 */

import CartModel from '../models/cartModel.js';
import {
  resolveUserId,
  sendInternalError,
} from './cartController.helpers.js';

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/items/:cartItemId
 * @access  Private
 */
export const removeItemFromCart = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    if (!Number.isFinite(userId)) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }

    const cartItemId = parseInt(req.params.cartItemId, 10);
    if (!Number.isFinite(cartItemId) || cartItemId <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Cart item ID is required and must be a positive integer.',
      });
    }

    const cartItem = await CartModel.findCartItemById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ success: false, error: 'Cart item not found' });
    }

    // Authorisation: the item's parent cart must belong to the requesting user.
    if (cartItem.carts.user_id !== userId) {
      return res.status(403).json({ success: false, error: 'Unauthorized to remove this item' });
    }

    // Store cart_id before deletion so we can refresh timestamps and totals.
    const { cart_id: cartId } = cartItem;

    await CartModel.removeCartItem(cartItemId);
    await CartModel.updateCartTimestamp(cartId);

    const updatedCart = await CartModel.getCartById(cartId);
    const cartWithTotals = CartModel.calculateTotals(updatedCart);

    return res.json({
      success: true,
      message: 'Item removed from cart successfully',
      cart: cartWithTotals,
    });

  } catch (error) {
    // Prisma record-not-found on delete (race: item deleted by another request).
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Cart item not found' });
    }
    sendInternalError(res, 'Failed to remove item from cart', error);
  }
};

/**
 * @desc    Clear all items from cart
 * @route   DELETE /api/cart/clear
 * @access  Private
 */
export const clearCart = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    if (!Number.isFinite(userId)) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }

    const cart = await CartModel.findActiveCart(userId);
    if (!cart) {
      return res.status(404).json({ success: false, error: 'No active cart found' });
    }

    const result = await CartModel.clearCartItems(cart.cart_id);
    await CartModel.updateCartTimestamp(cart.cart_id);

    return res.json({
      success: true,
      message: 'Cart cleared successfully',
      deleted_count: result.count,
    });

  } catch (error) {
    sendInternalError(res, 'Failed to clear cart', error);
  }
};                               

