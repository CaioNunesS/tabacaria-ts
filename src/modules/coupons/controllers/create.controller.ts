import { Request, Response } from 'express';
import { createCoupon } from '../service';

import httpStatus from 'http-status';

export const create = async (req: Request, res: Response) => {
  const { title, description, value } = req.body;

  const result = await createCoupon({ title, description, value });

  return res.status(httpStatus.CREATED).json({
    data: result,
  });
};
