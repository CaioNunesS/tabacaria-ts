import { Request, Response } from 'express';
import { deleteAddress } from '../services';

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteAddress(id);

  return res.status(204);
};
