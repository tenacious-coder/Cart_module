/**
 * cartRoute.docs.read.js
 * Swagger / OpenAPI JSDoc definitions for READ endpoints on /api/cart.
 *
 * Covers:
 *  - GET /api/cart        (get or create active cart)
 *  - GET /api/cart/count  (get item count)
 *
 * Register alongside the router in your swagger-jsdoc `apis` array:
 *   apis: [
 *     './routes/cartRoute.js',
 *     './routes/cartRoute.docs.read.js',
 *     './routes/cartRoute.docs.write.js',
 *   ]
 *
 * @module cartRoute.docs.read
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     tags: [Cart]
 *     summary: Get or create active cart
 *     description: >
 *       Retrieve the authenticated user's active cart with all items and
 *       calculated totals. If no active cart exists, a new one is automatically
 *       created.
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved or created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *             examples:
 *               emptyCart:
 *                 summary: Empty cart
 *                 value:
 *                   success: true
 *                   cart:
 *                     cart_id: 1
 *                     user_id: 5
 *                     status: ACTIVE
 *                     cart_items: []
 *                     total_items: 0
 *                     total_amount: 0
 *               cartWithItems:
 *                 summary: Cart with items
 *                 value:
 *                   success: true
 *                   cart:
 *                     cart_id: 1
 *                     user_id: 5
 *                     status: ACTIVE
 *                     cart_items:
 *                       - cart_item_id: 1
 *                         certification_id: 10
 *                         product_type: PRACTICE
 *                         quantity: 1
 *                         certification:
 *                           name: AWS Certified Solutions Architect
 *                           price: 2999.00
 *                     total_items: 1
 *                     total_amount: 2999.00
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               error: Authentication required
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/cart/count:
 *   get:
 *     tags: [Cart]
 *     summary: Get cart items count
 *     description: >
 *       Returns the total number of distinct line items in the user's active
 *       cart. Returns 0 when no active cart exists.
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Cart item count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   description: Total number of items in the cart
 *                   example: 3
 *             examples:
 *               withItems:
 *                 summary: Cart with items
 *                 value:
 *                   success: true
 *                   count: 3
 *               emptyCart:
 *                 summary: Empty or no cart
 *                 value:
 *                   success: true
 *                   count: 0
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
