import { Request, Response } from 'express';
import pick from '../../../utils/pick';
import { findAllUsers } from '../services';

export const findAll = async (req: Request, res: Response) => {
  const filter = pick(req.query, [
    'id',
    'name',
    'email',
    'createdAt',
    'active',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortType']);
  const result = await findAllUsers(filter, options);

  res.json(result);
};
