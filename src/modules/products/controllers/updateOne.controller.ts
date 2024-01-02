import { Request, Response } from 'express';
import { updateProduct } from '../services/updateProduct.service';

export const updateOne = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { name, price, description } = req.body;
  const updatedProduct = {
    name,
    price,
    description,
  };
  const result = await updateProduct(productId, updatedProduct);

  res.json(result);
};
