import { Request, Response } from 'express';
import { createOrder } from '../services/createOrder.service';
import httpStatus from 'http-status';

export const create = async (req: Request, res: Response) => {
  const { products, couponId } = req.body;
  const { userId } = req.payload;

  const coupon = couponId || null;

  const result = await createOrder({ products, couponId: coupon, userId });

  return res.status(httpStatus.CREATED).json({
    data: result,
  });
};
