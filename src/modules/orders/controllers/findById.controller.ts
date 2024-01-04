import { Request, Response } from 'express';
import { findOrderById } from '../services/findOrderById.service';

export const findById = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const result = await findOrderById(orderId);

  return res.json(result);
};
