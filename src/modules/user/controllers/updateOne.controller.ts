import { Request, Response } from 'express';
import { updateUser } from '../services';

export const updateOne = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name, email, role, password, phoneNumber } = req.body;
  const updatedUser = {
    name,
    email,
    role,
    password,
    phoneNumber,
  };

  const result = await updateUser(userId, updatedUser);

  res.json(result);
};
