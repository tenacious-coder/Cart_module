/**
 * cartController.helpers.js
 * Shared constants and pure helper functions for the cartController layer.
 *
 * Centralising these here means:
 *  - A product-type enum change requires one edit in cart.config.js only.
 *  - userId resolution and error-response logic are defined once and tested once.
 *  - No handler file needs to inline boilerplate.
 *  - Cart size limits and DoS guardrails are enforced from a single constant.
 *
 * @module cartController.helpers
 */

import cartConfig from '../config/cart.config.js';

// ---------------------------------------------------------------------------
// Constants  (Issue 3 — driven by cart.config.js, not hardcoded)
// ---------------------------------------------------------------------------

/**
 * Valid product type values.
 * Source of truth is cart.config.js — shared with swagger.js so the enum
 * in API docs is always in sync with validation logic.
 */
export const VALID_PRODUCT_TYPES = cartConfig.productTypes;

/**
 * The value stored in `certification.status_active` that indicates an
 * available certification. Centralised here so a DB enum change only
 * requires one edit.
 */
export const ACTIVE_STATUS = true; // schema stores a boolean, not the string 'active'

/**
 * Maximum number of distinct line-items permitted in a single cart.
 * Value is read from cart.config.js which supports env-var override.
 *
 * Enforcing this limit at the controller layer provides:
 *  - DoS / cart-bombing protection — a malicious actor cannot inflate
 *    server memory or DB row counts by hammering the add-to-cart endpoint.
 *  - A predictable upper bound for downstream queries (e.g. JOIN cardinality).
 */
export const MAX_CART_ITEMS = cartConfig.limits.maxItems;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extract and validate the authenticated user ID from the request object.
 *
 * Supports two middleware conventions:
 *  - `req.user.id`  (Passport / JWT middleware that sets req.user)
 *  - `req.userId`   (custom middleware that sets req.userId directly)
 *
 * Returns NaN when neither field is present so callers can use a single
 * `Number.isFinite` check rather than duplicating the guard everywhere.
 *
 * @param {import('express').Request} req
 * @returns {number}
 */
export function resolveUserId(req) {
  const raw = req.user?.id ?? req.userId;
  const id = parseInt(raw, 10);
  return Number.isFinite(id) && id > 0 ? id : NaN;
}

/**
 * Build the standard cart-creation payload from a request.
 *
 * @param {import('express').Request} req
 * @param {number} userId
 * @returns {Object}
 */
export function buildCartPayload(req, userId) {
  return {
    user_id:    userId,
    ip_address: req.ip ?? null,
    user_agent: req.headers['user-agent'] ?? null,
    created_by: userId,
  };
}

/**
 * Guard against cart overflow before inserting a new line-item. (Issue 1)
 *
 * Call this immediately after fetching the current cart and before any
 * write operation:
 *
 * @example
 * const limitHit = enforceCartLimit(cart, res);
 * if (limitHit) return; // response already sent
 *
 * @param {{ cart_items: unknown[] }} cart - The current cart record.
 * @param {import('express').Response} res
 * @returns {boolean} `true` when the limit was hit and a 400 was sent;
 *                    `false` when the cart still has capacity.
 */
export function enforceCartLimit(cart, res) {
  if (cart.cart_items.length >= MAX_CART_ITEMS) {
    res.status(400).json({
      success: false,
      error:   `Cart cannot exceed ${MAX_CART_ITEMS} items`,
    });
    return true;
  }
  return false;
}

/**
 * Respond with a 500 Internal Server Error. (Issue 4)
 *
 * Error details are logged server-side with full structured context but are
 * never forwarded to the client to avoid information leakage.
 *
 * The `context` parameter is optional and defaults to {} so all existing
 * callers (cartController.delete.js, cartController.read.js) require
 * zero changes.
 *
 * @param {import('express').Response} res
 * @param {string} clientMessage       - Safe, non-sensitive message for the client.
 * @param {Error}  error               - Full error object for server-side logging.
 * @param {Object} [context={}]        - Optional structured context for richer logs.
 * @param {number} [context.userId]    - Authenticated user ID at time of failure.
 * @param {number} [context.cartId]    - Cart ID being operated on, if known.
 * @param {string} [context.requestId] - Correlation / trace ID from upstream middleware.
 */
export function sendInternalError(res, clientMessage, error, context = {}) {
  console.error(`[cartController] ${clientMessage}:`, {
    error:     error?.message ?? String(error),
    stack:     error?.stack   ?? null,
    userId:    context.userId    ?? null,
    cartId:    context.cartId    ?? null,
    requestId: context.requestId ?? null,
    timestamp: new Date().toISOString(),
  });

  res.status(500).json({
    success: false,
    error:   clientMessage,
  });
}