import { Coupons } from '@prisma/client';
import { db } from '../../../config/index';

export const findCouponByTitle = async <Key extends keyof Coupons>(
  title: string,
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
  const result = await db.coupons.findFirst({
    where: { title },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });

  return result as Pick<Coupons, Key>;
};
