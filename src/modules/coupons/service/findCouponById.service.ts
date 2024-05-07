import { Coupons } from '@prisma/client';
import { db } from '../../../config/index';
import { throwError } from '../../../utils/index';

export const findCouponById = async <Key extends keyof Coupons>(
  couponId: string | undefined,
  keys: Key[] = [
    'id',
    'title',
    'description',
    'value',
    'createdAt',
    'updatedAt',
    'revoked',
  ] as Key[]
): Promise<Pick<Coupons, Key> | undefined> => {
  if (couponId) {
    const result = await db.coupons.findUnique({
      where: { id: couponId },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    });

    if (!result) throwError('Coupon não encontrado', 404);
    return result as Pick<Coupons, Key>;
  }
};
