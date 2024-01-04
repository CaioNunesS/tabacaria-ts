import { db } from '../../../config';
import { throwError } from '../../../utils';
import { findCouponById, verifyUserCoupon } from '../../coupons/coupon.service';
import { sumProductsPrice } from './sumProductsPrice.service';

export type ICreateOrder = {
  id?: string;
  products: string[];
  couponId?: string | undefined;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  value?: string;
};

export const createOrder = async ({
  products,
  couponId,
  userId,
}: ICreateOrder) => {
  const getCoupon = await findCouponById(couponId);

  if (getCoupon && getCoupon.revoked === true) {
    throwError('Coupon inválido', 400);
  }
  let value = '0';

  value = await sumProductsPrice({
    products,
    valueDiscount: getCoupon && getCoupon.value ? +getCoupon.value : 0,
  });
  const result = await db.orders.create({
    data: {
      value,
      products: {
        create: products.map(product => ({
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
      discount: getCoupon?.value ?? '0',
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
  });
  if (couponId) {
    await verifyUserCoupon(userId, couponId);
  }
  return result;
};
