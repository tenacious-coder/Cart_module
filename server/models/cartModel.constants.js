/**
 * cartModel.constants.js
 * Shared constants and pure helpers for the CartModel data-access layer.
 *
 * Centralising these here means a schema change (e.g. adding a product type or
 * renaming a price column) requires exactly one edit, visible to every module
 * that imports from this file.
 *
 * @module cartModel.constants
 */

// ---------------------------------------------------------------------------
// Prisma select / include shapes
// ---------------------------------------------------------------------------

/** Shared field-selection shape for certification payloads. */
export const CERTIFICATION_SELECT = Object.freeze({
  certification_id: true,
  certification_name: true,
  certification_code: true,
  certification_image_path: true,
  mock_test_price: true,
  practice_test_price: true,
  final_exam_price: true,
  bundle_price: true,
  status_active: true,
});

/** Shared include shape for a cart with full item + certification detail. */
export const CART_WITH_ITEMS_INCLUDE = Object.freeze({
  cart_items: {
    include: {
      certification: {
        select: CERTIFICATION_SELECT,
      },
    },
  },
});

// ---------------------------------------------------------------------------
// Product-type enum and price mapping
// ---------------------------------------------------------------------------

/** Enumerated product-type values (mirrors DB enum). */
export const PRODUCT_TYPE = Object.freeze({
  MOCK: 'MOCK',
  PRACTICE: 'PRACTICE',
  FINAL: 'FINAL',
  BUNDLE: 'BUNDLE',
});

/** Map from product_type → certification price field. */
export const PRICE_FIELD_MAP = Object.freeze({
  [PRODUCT_TYPE.MOCK]: 'mock_test_price',
  [PRODUCT_TYPE.PRACTICE]: 'practice_test_price',
  [PRODUCT_TYPE.FINAL]: 'final_exam_price',
  [PRODUCT_TYPE.BUNDLE]: 'bundle_price',
});

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

/**
 * Safely parse a Prisma Decimal / string / number to a JS float.
 * Returns 0 when the value is null, undefined, NaN, or non-parseable.
 *
 * @param {*} value
 * @returns {number}
 */
export function toFloat(value) {
  if (value == null) return 0;
  const n =
    typeof value === 'object' && typeof value.toNumber === 'function'
      ? value.toNumber() // Prisma Decimal
      : parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}