import { Request, Response } from 'express';
import { findUserByEmail } from '../services';

export const findOneByEmail = async (req: Request, res: Response) => {
  const { email } = req.query;

  if (typeof email === 'string') {
    const result = await findUserByEmail(email);

    res.json(result);
  }
};
