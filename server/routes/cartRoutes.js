/**
 * cartRoute.js
 * Express router for all /api/cart endpoints.
 *
 * Route order matters:
 *  - Static segments (/count, /clear) are declared BEFORE parameterised segments
 *    (/:cartItemId) so Express resolves them correctly.
 *  - All routes require authentication via the requireAuth middleware applied
 *    at the router level.
 *  - Write operations (POST/DELETE) are protected by cartWriteLimiter to prevent
 *    API abuse while leaving read operations (GET) unthrottled for UX smoothness.
 *
 * Swagger/OpenAPI annotations live in cartRoute.docs.js.
 * Ensure that file is included in your swagger-jsdoc `apis` array:
 *   apis: ['./routes/cartRoute.js', './routes/cartRoute.docs.js']
 *
 * @module cartRoute
 */

import express from 'express';
import rateLimit from 'express-rate-limit';
import requireAuth from '../middleware/requireAuth.js';
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
  getCartItemsCount,
} from '../controllers/cartController.js';

const router = express.Router();

/**
 * Rate limiter for cart write operations (POST / DELETE).
 *
 * - Window : 15 minutes
 * - Ceiling : 100 requests per IP per window
 *
 * GET routes are intentionally excluded — throttling reads would
 * degrade UX (e.g. live cart count polling) without meaningful
 * security benefit, since reads expose no mutation surface.
 */
const cartWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // max requests per window per IP
  standardHeaders: true,     // return rate-limit info in RateLimit-* headers
  legacyHeaders: false,      // disable deprecated X-RateLimit-* headers
  message: {
    status: 429,
    error: 'Too many cart operations, please try again later.',
  },
});

// ─── Authentication ───────────────────────────────────────────────────────────
// Apply authentication guard to every route in this router.
router.use(requireAuth);

// ─── GET routes (umlimited — reads are safe) ──────────────────────────────────
router.get('/', getCart);
router.get('/count', getCartItemsCount);

// ─── POST routes ──────────────────────────────────────────────────────────────
router.post('/items', cartWriteLimiter, addItemToCart);

// ─── DELETE routes ────────────────────────────────────────────────────────────
// Static segment (/clear) MUST precede the parameterised segment
// (/items/:cartItemId) so Express does not treat "clear" as a cartItemId.
router.delete('/clear', cartWriteLimiter, clearCart);
router.delete('/items/:cartItemId', cartWriteLimiter, removeItemFromCart);

export default router;