/**
 * cartController.helpers.js
 * Shared constants and pure helper functions for the cartController layer.
 *
 * Centralising these here means:
 *  - A product-type enum change requires one edit in one place.
 *  - userId resolution and error-response logic are defined once and tested once.
 *  - No handler file needs to inline boilerplate.
 *
 * @module cartController.helpers
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Valid product type values — single source of truth for this layer. */
export const VALID_PRODUCT_TYPES = Object.freeze(['MOCK', 'PRACTICE', 'FINAL', 'BUNDLE']);

/**
 * The value stored in `certification.status_active` that indicates an
 * available certification. Centralised here so a DB enum change only requires
 * one edit.
 */
export const ACTIVE_STATUS = true; // schema stores a boolean, not the string 'active'

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
    user_id: userId,
    ip_address: req.ip ?? null,
    user_agent: req.headers['user-agent'] ?? null,
    created_by: userId,
  };
}

/**
 * Respond with a 500 Internal Server Error.
 * Error details are logged server-side but never forwarded to the client
 * to avoid information leakage.
 *
 * @param {import('express').Response} res
 * @param {string} clientMessage  - Safe, non-sensitive message for the client.
 * @param {Error}  error          - Full error object for server-side logging.
 */
export function sendInternalError(res, clientMessage, error) {
  console.error(`[cartController] ${clientMessage}:`, error);
  res.status(500).json({
    success: false,
    error: clientMessage,
  });
}