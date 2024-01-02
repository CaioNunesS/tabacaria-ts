import { Request, Response } from 'express';
import { findUserById } from '../services';

export const findOne = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const client = await findUserById(userId);
  res.json(client);
};
