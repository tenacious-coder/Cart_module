/**
 * cartModel.cart.js
 * Prisma wrappers for cart-level (carts table) operations.
 *
 * Responsibility: CRUD on the `carts` table only.
 * No business logic, no HTTP concerns.
 *
 * @module cartModel.cart
 */

import prisma from '../lib/prisma.js';
import { CART_WITH_ITEMS_INCLUDE } from './cartModel.constants.js';

/**
 * Returns the single ACTIVE cart for a user, including all items and their
 * certification details.
 *
 * @param {number} userId
 * @returns {Promise<Object|null>}
 */
export async function findActiveCart(userId) {
  return prisma.carts.findFirst({
    where: { user_id: userId, status: 'ACTIVE' },
    include: CART_WITH_ITEMS_INCLUDE,
  });
}

/**
 * Creates a new ACTIVE cart and returns it with its (initially empty) items.
 *
 * @param {{ user_id: number, ip_address?: string, user_agent?: string, created_by?: number }} data
 * @returns {Promise<Object>}
 */
export async function createCart(data) {
  return prisma.carts.create({
    data: {
      user_id: data.user_id,
      status: 'ACTIVE',
      ip_address: data.ip_address ?? null,
      user_agent: data.user_agent ?? null,
      created_by: data.created_by ?? null,
    },
    include: CART_WITH_ITEMS_INCLUDE,
  });
}

/**
 * Returns a cart by its primary key, including all items and certifications.
 *
 * @param {number} cartId
 * @returns {Promise<Object|null>}
 */
export async function getCartById(cartId) {
  return prisma.carts.findUnique({
    where: { cart_id: cartId },
    include: CART_WITH_ITEMS_INCLUDE,
  });
}

/**
 * Bumps `updated_at` on the specified cart to the current timestamp.
 *
 * @param {number} cartId
 * @returns {Promise<Object>}
 */
export async function updateCartTimestamp(cartId) {
  return prisma.carts.update({
    where: { cart_id: cartId },
    data: { updated_at: new Date() },
  });
}

/**
 * Returns the total number of items in the user's ACTIVE cart.
 * Returns 0 when no ACTIVE cart exists.
 *
 * @param {number} userId
 * @returns {Promise<number>}
 */
export async function getCartItemsCount(userId) {
  const cart = await prisma.carts.findFirst({
    where: { user_id: userId, status: 'ACTIVE' },
    include: {
      _count: { select: { cart_items: true } },
    },
  });
  return cart?._count?.cart_items ?? 0;
}