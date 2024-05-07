import { Request, Response } from 'express';
import { findCouponById } from '../service';

export const findById = async (req: Request, res: Response) => {
  const { couponId } = req.params;

  const result = await findCouponById(couponId);

  return res.json({ data: result });
};
