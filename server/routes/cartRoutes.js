/**
 * cartRoute.js
 * Express router for all /api/cart endpoints.
 *
 * Route order matters:
 *  - Static segments (/count, /clear) are declared BEFORE parameterised segments
 *    (/:cartItemId) so Express resolves them correctly.
 *  - All routes require authentication via the requireAuth middleware applied
 *    at the router level.
 *
 * Swagger/OpenAPI annotations live in cartRoute.docs.js.
 * Ensure that file is included in your swagger-jsdoc `apis` array:
 *   apis: ['./routes/cartRoute.js', './routes/cartRoute.docs.js']
 *
 * @module cartRoute
 */

import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
  getCartItemsCount,
} from '../controllers/cartController.js';

const router = express.Router();

// Apply authentication guard to every route in this router.
router.use(requireAuth);

// Static GET routes
router.get('/', getCart);
router.get('/count', getCartItemsCount);

// POST routes
router.post('/items', addItemToCart);

// Static DELETE routes — must precede parameterised DELETE routes so Express
// does not match the literal string "clear" as a :cartItemId value.
router.delete('/clear', clearCart);

// Parameterised DELETE routes
router.delete('/items/:cartItemId', removeItemFromCart);

export default router;
