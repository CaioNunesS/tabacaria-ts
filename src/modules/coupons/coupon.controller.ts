import { Request, Response } from 'express';
import { createCoupon, findCouponById, findAllCoupons } from './coupon.service';

import pick from '../../utils/pick';
import httpStatus from 'http-status';

export const create = async (req: Request, res: Response) => {
  const { title, description, value } = req.body;

  const result = await createCoupon({ title, description, value });

  return res.status(httpStatus.CREATED).json({
    data: result,
  });
};

export const findAll = async (req: Request, res: Response) => {
  const filter = pick(req.query, [
    'id',
    'title',
    'description',
    'value',
    'createdAt',
    'updatedAt',
    'revoked',
  ]);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortType']);

  const result = await findAllCoupons(filter, options);

  res.json(result);
};

export const findById = async (req: Request, res: Response) => {
  const { couponId } = req.params;

  const result = await findCouponById(couponId);

  return res.json({ data: result });
};
