import { Request, Response } from 'express';
import { findAddressByUserId } from '../services';

export const findAddressesByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await findAddressByUserId(userId);

  return res.json({ data: result });
};
