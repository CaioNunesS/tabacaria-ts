import { db } from '../../config/index'
import { throwError } from '../../utils/index'

import { findProductById } from '../products/product.service'
import { findCouponById, verifyUserCoupon } from '../coupons/coupon.service'
import { Coupons, Orders } from '@prisma/client'

type ICreateOrder = {
  products: string[]
  couponId?: string | undefined
  userId: string
}

type IsumProductsPrice = {
  products: string[]
  valueDiscount: number
}

export const createOrder = async ({
  products,
  couponId,
  userId,
}: ICreateOrder) => {
  // try {
  const getCoupon = await findCouponById(couponId)

  if (getCoupon && getCoupon.revoked === true) {
    throwError('Coupon inválido', 400)
  }
  let value = '0'

  value = await sumProductsPrice({
    products,
    valueDiscount: getCoupon && getCoupon.value ? +getCoupon.value : 0,
  })
  const result = await db.orders.create({
    data: {
      value,
      products: {
        create: products.map((product) => ({
          Products: {
            connect: {
              id: product,
            },
          },
        })),
      },
      coupons: couponId
        ? {
            connect: { id: couponId },
          }
        : undefined,
      User: {
        connect: { id: userId },
      },
      discount: value ?? '0',
    },
    include: {
      products: { select: { Products: true } },
      coupons: !!couponId,
      User: {
        select: {
          name: true,
        },
      },
    },
  })
  if (couponId) {
    await verifyUserCoupon(userId, couponId)
  }
  return result
  // } catch (error) {
  //   throwError('Erro para criar order', 400)
  // }
}

export const findAllOrders = async (
  filter: {
    id?: string
    value?: string
    createdAt?: Date
    updatedAt?: Date
    userId?: string
  },
  options: {
    limit?: number
    page?: number
    sortBy?: string
    sortType?: 'asc' | 'desc'
  },
) => {
  const page = options.page ?? 1
  const limit = options.limit ?? 10
  const sortBy = options.sortBy
  const sortType = options.sortType ?? 'desc'

  const result = await db.orders.findMany({
    where: filter,
    include: {
      products: {
        include: {
          Products: { select: { name: true, price: true } },
        },
      },
      coupons: true,
      User: {
        select: {
          name: true,
        },
      },
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  })

  return result
}

export const findOrderById = async <Key extends keyof Orders>(
  orderId: string,
  keys: Key[] = [
    'id',
    'createdAt',
    'updatedAt',
    'userId',
    'discount',
    'isPaid',
    'value',
  ] as Key[],
): Promise<Pick<Orders, Key> | undefined> => {
  const getOrder = await db.orders.findUnique({
    where: { id: orderId },
    // select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    include: {
      products: {
        include: {
          Products: { select: { name: true, price: true } },
        },
      },
      coupons: true,
      User: {
        select: {
          name: true,
        },
      },
    },
  })
  if (!getOrder) throwError('Pedido não encontrado', 404)

  return getOrder as Pick<Orders, Key>
}

const sumProductsPrice = async ({
  products,
  valueDiscount,
}: IsumProductsPrice) => {
  let productPrice = 0

  for (const productId of products) {
    const product = await findProductById(productId)
    if (product) {
      productPrice += Number.parseFloat(product.price)
    }
  }
  return (productPrice - (valueDiscount ?? 0)).toFixed(2)
}
