import { db } from '../../../config/index';
import { throwError } from '../../../utils/index';
import { revokeCoupon } from './revokeCoupon.service';

export const verifyUserCoupon = async (userId: string, couponsId: string) => {
  if (couponsId) {
    const userUseCoupon = await db.userCoupons.findMany({
      where: {
        OR: [
          { userId, couponsId },
          { userId: couponsId, couponsId: userId },
        ],
      },
    });
    if (userUseCoupon.length > 5) {
      await revokeCoupon(couponsId);
      throwError('Limite de uso do cupom atingido', 400);
    }

    await db.userCoupons.create({
      data: { userId, couponsId },
    });
  }
};
