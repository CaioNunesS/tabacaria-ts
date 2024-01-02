import { Request, Response } from 'express';
import { deleteUser } from '../services';
import httpStatus from 'http-status';

export const deleteOne = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await deleteUser(userId);

  return res.status(httpStatus.NO_CONTENT).send();
};
