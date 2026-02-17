/**
 * cartController.read.js
 * GET request handlers for /api/cart endpoints.
 *
 * Handlers:
 *  - getCart           GET /api/cart
 *  - getCartItemsCount GET /api/cart/count
 *
 * @module cartController.read
 */

import CartModel from '../models/cartModel.js';
import {
  resolveUserId,
  buildCartPayload,
  sendInternalError,
} from './cartController.helpers.js';

/**
 * @desc    Get or create active cart for authenticated user
 * @route   GET /api/cart
 * @access  Private
 */
export const getCart = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    if (!Number.isFinite(userId)) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }

    let cart = await CartModel.findActiveCart(userId);

    if (!cart) {
      cart = await CartModel.createCart(buildCartPayload(req, userId));
    }

    const cartWithTotals = CartModel.calculateTotals(cart);

    return res.json({ success: true, cart: cartWithTotals });

  } catch (error) {
    sendInternalError(res, 'Failed to fetch cart', error);
  }
};

/**
 * @desc    Get total count of items in the active cart
 * @route   GET /api/cart/count
 * @access  Private
 */
export const getCartItemsCount = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    if (!Number.isFinite(userId)) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }

    const count = await CartModel.getCartItemsCount(userId);

    return res.json({ success: true, count });

  } catch (error) {
    sendInternalError(res, 'Failed to fetch cart count', error);
  }
};