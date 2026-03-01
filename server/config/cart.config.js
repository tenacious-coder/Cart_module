/**
 * cart.config.js
 * Central configuration for all cart business-rule constants.
 *
 * This is the single source of truth for product types and cart limits.
 * Both cartController.helpers.js and swagger.js import from here, so
 * adding a new product type requires editing only this one file.
 *
 * @module cart.config
 */

const cartConfig = Object.freeze({
  /**
   * Exhaustive list of valid product types accepted by the cart API.
   * Add or remove values here when the product catalogue changes.
   * swagger.js and cartController.helpers.js both read from this array.
   */
  productTypes: Object.freeze(['MOCK', 'PRACTICE', 'FINAL', 'BUNDLE']),

  limits: Object.freeze({
    /**
     * Maximum distinct line-items allowed in a single active cart.
     * Enforced at the controller layer to prevent cart-bombing / DoS.
     * Override via environment variable for per-environment tuning:
     *   MAX_CART_ITEMS=100 node server.js
     */
    maxItems: parseInt(process.env.MAX_CART_ITEMS, 10) || 50,
  }),
});

export default cartConfig;