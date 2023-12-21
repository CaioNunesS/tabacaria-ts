import { Request, Response } from 'express';
import { findUserById } from '../services/index';

export const profile = async (req: Request, res: Response) => {
  const { userId } = req.payload;

  const result = await findUserById(userId);

  return res.json(result);
};
