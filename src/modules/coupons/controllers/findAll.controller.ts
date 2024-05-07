import { Request, Response } from 'express';
import { findAllCoupons } from '../service';

import pick from '../../../utils/pick';

export const findAll = async (req: Request, res: Response) => {
  const filter = pick(req.query, [
    'id',
    'title',
    'description',
    'value',
    'createdAt',
    'updatedAt',
    'revoked',
  ]);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortType']);

  const result = await findAllCoupons(filter, options);

  res.json(result);
};
