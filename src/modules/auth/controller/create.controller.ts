import { Request, Response } from 'express';
import { register } from '../service';

export const create = async (req: Request, res: Response) => {
  const { email, password, name, gitHubId, phoneNumber } = req.body;
  const result = await register({
    email,
    password,
    name,
    gitHubId,
    phoneNumber,
  });

  res.json(result);
};
