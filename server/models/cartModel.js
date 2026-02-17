/**
 * cartModel.js  ← barrel / entry point
 * Re-exports all CartModel methods as a single default-exported object.
 *
 * The public API of this module is intentionally identical to the pre-split
 * version, so cartController.js requires zero changes:
 *
 *   import CartModel from '../models/cartModel.js';
 *   CartModel.findActiveCart(userId);   // still works
 *   CartModel.calculateTotals(cart);    // still works
 *
 * Internal file layout:
 *   cartModel.constants.js  — shared constants and pure helpers
 *   cartModel.cart.js       — carts-table Prisma wrappers + getCartItemsCount
 *   cartModel.items.js      — cart_items + certification Prisma wrappers
 *   cartModel.totals.js     — pure calculateTotals computation
 *
 * @module cartModel
 */

import {
  findActiveCart,
  createCart,
  getCartById,
  updateCartTimestamp,
  getCartItemsCount,
} from './cartModel.cart.js';

import {
  findCartItem,
  addCartItem,
  findCartItemById,
  removeCartItem,
  clearCartItems,
  findCertificationById,
} from './cartModel.items.js';

import { calculateTotals } from './cartModel.totals.js';

const CartModel = {
  // Cart queries
  findActiveCart,
  createCart,
  getCartById,
  updateCartTimestamp,

  // Cart-item queries
  findCartItem,
  addCartItem,
  findCartItemById,
  removeCartItem,
  clearCartItems,

  // Certification queries
  findCertificationById,

  // Aggregate queries
  getCartItemsCount,

  // Pure computation
  calculateTotals,
};

export default CartModel;