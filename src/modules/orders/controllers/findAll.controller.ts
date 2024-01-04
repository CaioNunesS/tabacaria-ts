import { Request, Response } from 'express';
import pick from '../../../utils/pick';
import { findAllOrders } from '../services/findAllOrders.service';

export const findAll = async (req: Request, res: Response) => {
  const filter = pick(req.query, [
    'id',
    'createdAt',
    'updatedAt',
    'value',
    'userId',
    'revoked',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortType']);
  const result = await findAllOrders(filter, options);

  res.json(result);
};
