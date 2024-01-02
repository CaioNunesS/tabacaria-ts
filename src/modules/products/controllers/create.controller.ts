import { Request, Response } from 'express';
import { createProduct } from '../services/createProduct.service';
import httpStatus from 'http-status';

export const create = async (req: Request, res: Response) => {
  const { name, price, description } = req.body;

  const result = await createProduct({ name, price, description });

  return res.status(httpStatus.CREATED).json(result);
};
