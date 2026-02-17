/**
 * cartRoute.docs.post.js
 * Swagger / OpenAPI JSDoc definitions for the POST endpoint on /api/cart.
 *
 * Covers:
 *  - POST /api/cart/items (add item to cart)
 *
 * Register alongside the router in your swagger-jsdoc `apis` array:
 *   apis: [
 *     './routes/cartRoute.js',
 *     './routes/cartRoute.docs.read.js',
 *     './routes/cartRoute.docs.post.js',
 *     './routes/cartRoute.docs.write.js',
 *   ]
 *
 * @module cartRoute.docs.post
 */

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     tags: [Cart]
 *     summary: Add item to cart
 *     description: >
 *       Add a certification exam product (MOCK, PRACTICE, FINAL, or BUNDLE) to
 *       the user's active cart. A new cart is created automatically if one does
 *       not exist. Duplicate items (same certification + product_type) are
 *       rejected.
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - certification_id
 *               - product_type
 *             properties:
 *               certification_id:
 *                 type: integer
 *                 description: ID of the certification to add
 *                 example: 10
 *               product_type:
 *                 type: string
 *                 enum: [MOCK, PRACTICE, FINAL, BUNDLE]
 *                 description: Type of exam product
 *                 example: PRACTICE
 *           examples:
 *             practiceExam:
 *               summary: Add practice exam
 *               value:
 *                 certification_id: 10
 *                 product_type: PRACTICE
 *             mockExam:
 *               summary: Add mock exam
 *               value:
 *                 certification_id: 15
 *                 product_type: MOCK
 *             bundle:
 *               summary: Add bundle
 *               value:
 *                 certification_id: 20
 *                 product_type: BUNDLE
 *     responses:
 *       201:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Item added to cart successfully
 *                 cart_item:
 *                   $ref: '#/components/schemas/CartItem'
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Validation error or duplicate item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missingFields:
 *                 summary: Missing required fields
 *                 value:
 *                   success: false
 *                   error: certification_id and product_type are required
 *               invalidType:
 *                 summary: Invalid product type
 *                 value:
 *                   success: false
 *                   error: 'Invalid product_type. Must be one of: MOCK, PRACTICE, FINAL, BUNDLE'
 *               alreadyExists:
 *                 summary: Item already in cart
 *                 value:
 *                   success: false
 *                   error: Item already exists in cart
 *               inactiveCert:
 *                 summary: Certification not active
 *                 value:
 *                   success: false
 *                   error: Certification is not active
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Certification not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               error: Certification not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
