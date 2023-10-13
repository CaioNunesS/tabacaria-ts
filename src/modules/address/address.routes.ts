import { Router } from 'express';
import { asyncWrapper, validate } from '../../middleware';
import {
  create,
  deleteOne,
  findAddressesByUserId,
  update,
} from './address.controller';
import { addressSchema } from './address.schema';

const addressRoutes = Router();

addressRoutes.post('/', validate(addressSchema), asyncWrapper(create));
addressRoutes.get('/:userId', asyncWrapper(findAddressesByUserId));
addressRoutes.put('/:id', asyncWrapper(update));
addressRoutes.delete('/:id', asyncWrapper(deleteOne));

export default addressRoutes;
