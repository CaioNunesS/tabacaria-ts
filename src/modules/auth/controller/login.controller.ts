import { Request, Response } from 'express';
import { authenticatedUserByEmailAndPassword } from '../service';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authenticatedUserByEmailAndPassword(email, password);

  return res.json(result);
};
