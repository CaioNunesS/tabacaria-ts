import { Request, Response } from 'express';
import { updateAddress } from '../services';

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
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

  const data = {
    street,
    city,
    neighborhood,
    number,
    zipCode,
    AdditionalData,
    state,
    userId,
  };

  const result = await updateAddress(id, data);

  return res.json({ data: result });
};
