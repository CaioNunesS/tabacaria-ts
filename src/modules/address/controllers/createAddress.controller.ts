import { Request, Response } from 'express';
import { createAddress } from '../services';

export const create = async (req: Request, res: Response) => {
  const {
    street,
    city,
    neighborhood,
    number,
    zipCode,
    AdditionalData,
    state,
    userId,
  } = req.body;

  const result = await createAddress({
    street,
    city,
    state,
    neighborhood,
    number,
    zipCode,
    AdditionalData,
    userId,
  });

  return res.json({ data: result });
};
