/**
 * cartRoute.docs.write.js
 * Swagger / OpenAPI JSDoc definitions for DELETE endpoints on /api/cart.
 *
 * Covers:
 *  - DELETE /api/cart/clear             (clear all items)
 *  - DELETE /api/cart/items/:cartItemId (remove single item)
 *
 * Register alongside the router in your swagger-jsdoc `apis` array:
 *   apis: [
 *     './routes/cartRoute.js',
 *     './routes/cartRoute.docs.read.js',
 *     './routes/cartRoute.docs.post.js',
 *     './routes/cartRoute.docs.write.js',
 *   ]
 *
 * @module cartRoute.docs.write
 */

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     tags: [Cart]
 *     summary: Clear all items from cart
 *     description: >
 *       Remove every item from the user's active cart. The cart record itself
 *       remains ACTIVE — only the line items are deleted.
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
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
 *                   example: Cart cleared successfully
 *                 deleted_count:
 *                   type: integer
 *                   description: Number of items removed
 *                   example: 3
 *             example:
 *               success: true
 *               message: Cart cleared successfully
 *               deleted_count: 3
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No active cart found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               error: No active cart found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/cart/items/{cartItemId}:
 *   delete:
 *     tags: [Cart]
 *     summary: Remove item from cart
 *     description: >
 *       Remove a specific item from the user's cart. The authenticated user
 *       must own the cart that contains the item.
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - name: cartItemId
 *         in: path
 *         required: true
 *         description: Primary key of the cart item to remove
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Item removed successfully
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
 *                   example: Item removed from cart successfully
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Cart item ID missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               error: Cart item ID is required
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Caller does not own the cart containing this item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               error: Unauthorized to remove this item
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               error: Cart item not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
