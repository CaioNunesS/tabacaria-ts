import { Router } from 'express';
import { asyncWrapper } from '../../middleware';
import {
  create,
  deleteOne,
  findAddressesByUserId,
  update,
} from './address.controller';

const addressRoutes = Router();

addressRoutes.post('/', asyncWrapper(create));
addressRoutes.get('/:userId', asyncWrapper(findAddressesByUserId));
addressRoutes.put('/:id', asyncWrapper(update));
addressRoutes.delete('/:id', asyncWrapper(deleteOne));

export default addressRoutes;
