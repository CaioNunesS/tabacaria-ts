import { Request, Response } from 'express';
import { deleteProduct } from '../services/deleteProduct.service';
import httpStatus from 'http-status';

export const deleteOne = async (req: Request, res: Response) => {
  const { productId } = req.params;
  deleteProduct(productId);

  res.status(httpStatus.NO_CONTENT).send();
};
