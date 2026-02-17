/**
 * cartController.js  ← barrel / entry point
 * Re-exports all request handlers so the router import path is unchanged:
 *
 *   import { getCart, addItemToCart, ... } from '../controllers/cartController.js';
 *
 * Internal file layout:
 *   cartController.helpers.js  — shared constants + resolveUserId, buildCartPayload, sendInternalError
 *   cartController.read.js     — GET  handlers: getCart, getCartItemsCount
 *   cartController.write.js    — POST handler:  addItemToCart
 *   cartController.delete.js   — DELETE handlers: removeItemFromCart, clearCart
 *
 * @module cartController
 */

export { getCart, getCartItemsCount }    from './cartController.read.js';
export { addItemToCart }                 from './cartController.write.js';
export { removeItemFromCart, clearCart } from './cartController.delete.js';