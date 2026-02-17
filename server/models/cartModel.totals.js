/**
 * cartModel.totals.js
 * Pure computation helper for cart financial totals.
 *
 * Contains no Prisma calls, no I/O, and no side-effects.
 * Safe to unit-test in complete isolation.
 *
 * @module cartModel.totals
 */

import { PRICE_FIELD_MAP, toFloat } from './cartModel.constants.js';

/**
 * Annotates a cart object with computed financial totals.
 *
 * - Prices are resolved safely via `toFloat()` to handle Prisma Decimals, null
 *   values, and any malformed data without throwing.
 * - `subtotal`, `discount`, and `total` are returned as strings with exactly
 *   2 decimal places (consistent with the original API contract).
 * - `items_count` reflects the number of line items (not total quantity).
 *
 * This is a **pure function** with no I/O or side-effects.
 *
 * @param {Object|null} cart - Cart object as returned by findActiveCart / getCartById
 * @returns {Object|null} The original cart reference extended with totals, or
 *   the original value unchanged when cart is falsy or has no items array.
 */
export function calculateTotals(cart) {
  if (!cart?.cart_items) {
    return cart;
  }

  let subtotal = 0;

  for (const item of cart.cart_items) {
    const priceField = PRICE_FIELD_MAP[item.product_type];
    if (!priceField) continue; // unknown product_type — skip rather than throw

    const certification = item.certification;
    if (!certification) continue; // defensive: item without certification

    const itemPrice = toFloat(certification[priceField]);
    const quantity =
      typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1;

    subtotal += itemPrice * quantity;
  }

  // Discount placeholder — zero until coupon logic is introduced.
  const discount = 0;
  const total = Math.max(0, subtotal - discount);

  return {
    ...cart,
    subtotal: subtotal.toFixed(2),
    discount: discount.toFixed(2),
    total: total.toFixed(2),
    items_count: cart.cart_items.length,
  };
}