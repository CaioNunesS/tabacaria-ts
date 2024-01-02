import { Request, Response } from 'express';
import { findProductById } from '../services/findProductById.service';

export const findById = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await findProductById(productId);

  return res.json(result);
};
