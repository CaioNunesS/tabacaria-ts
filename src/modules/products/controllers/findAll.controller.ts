import { Request, Response } from 'express';
import pick from '../../../utils/pick';
import { findAllProducts } from '../services/findAllProducts.service';

export const findAll = async (req: Request, res: Response) => {
  const filter = pick(req.query, [
    'id',
    'name',
    'email',
    'role',
    'createdAt',
    'updatedAt',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortType']);
  const result = await findAllProducts(filter, options);

  res.json(result);
};
