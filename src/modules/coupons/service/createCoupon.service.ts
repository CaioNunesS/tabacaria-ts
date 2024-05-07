import { db } from '../../../config/index';
import { throwError } from '../../../utils/index';
import { findCouponByTitle } from './findCouponByTitle.service';

export type IcreateCoupon = {
  id?: string;
  title: string;
  description: string;
  value: string;
  createdAt?: Date;
  updatedAt?: Date;
  revoked?: boolean;
};

export const createCoupon = async ({
  title,
  description,
  value,
}: IcreateCoupon) => {
  const getCoupon = await findCouponByTitle(title);
  if (getCoupon) throwError('Coupon já cadastrado', 409);

  const result = await db.coupons.create({
    data: { title, description, value },
  });
  return result;
};
