import { Coupons } from '@prisma/client';
import { db } from '../../../config/index';
import { findCouponById } from './findCouponById.service';

export const revokeCoupon = async (
  id: string
): Promise<Coupons | undefined | null> => {
  await findCouponById(id);

  if (!id) return null;

  return db.coupons.update({
    where: { id },
    data: { revoked: true },
  });
};
