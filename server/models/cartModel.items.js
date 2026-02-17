/**
 * cartModel.items.js
 * Prisma wrappers for cart_items and certification table operations.
 *
 * Responsibility: CRUD on `cart_items` and read on `certification`.
 * No business logic, no HTTP concerns.
 *
 * @module cartModel.items
 */

import prisma from '../lib/prisma.js';
import { CERTIFICATION_SELECT } from './cartModel.constants.js';

/**
 * Returns the first cart item matching the (cart, certification, product_type)
 * composite key, or null if not found.
 *
 * @param {number} cartId
 * @param {number} certificationId
 * @param {string} productType
 * @returns {Promise<Object|null>}
 */
export async function findCartItem(cartId, certificationId, productType) {
  return prisma.cart_items.findFirst({
    where: {
      cart_id: cartId,
      certification_id: certificationId,
      product_type: productType,
    },
  });
}

/**
 * Adds a new item to the cart and returns it with certification details.
 *
 * @param {{ cart_id: number, certification_id: number, product_type: string, quantity?: number, created_by?: number }} data
 * @returns {Promise<Object>}
 */
export async function addCartItem(data) {
  return prisma.cart_items.create({
    data: {
      cart_id: data.cart_id,
      certification_id: data.certification_id,
      product_type: data.product_type,
      quantity: data.quantity ?? 1,
      created_by: data.created_by ?? null,
    },
    include: {
      certification: { select: CERTIFICATION_SELECT },
    },
  });
}

/**
 * Returns a single cart item by its primary key, including the parent cart.
 *
 * @param {number} cartItemId
 * @returns {Promise<Object|null>}
 */
export async function findCartItemById(cartItemId) {
  return prisma.cart_items.findUnique({
    where: { cart_item_id: cartItemId },
    include: { carts: true },
  });
}

/**
 * Hard-deletes a single cart item.
 *
 * @param {number} cartItemId
 * @returns {Promise<Object>}
 */
export async function removeCartItem(cartItemId) {
  return prisma.cart_items.delete({
    where: { cart_item_id: cartItemId },
  });
}

/**
 * Hard-deletes all items belonging to a cart.
 *
 * @param {number} cartId
 * @returns {Promise<{ count: number }>}
 */
export async function clearCartItems(cartId) {
  return prisma.cart_items.deleteMany({
    where: { cart_id: cartId },
  });
}

/**
 * Returns a certification by its primary key, or null if not found.
 *
 * @param {number} certificationId
 * @returns {Promise<Object|null>}
 */
export async function findCertificationById(certificationId) {
  return prisma.certification.findUnique({
    where: { certification_id: certificationId },
  });
}