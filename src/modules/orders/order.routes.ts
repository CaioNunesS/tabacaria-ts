import { Router } from 'express';
import {
  asyncWrapper,
  isAuthenticated,
  validate,
} from '../../middleware/index';
import { create, findAll, findById } from './controllers';
import { orderSchema } from './schemas/createOrder.schema';

const orderRoutes = Router();

orderRoutes.post(
  '/',
  isAuthenticated,
  validate(orderSchema),
  asyncWrapper(create)
);
orderRoutes.get('/', asyncWrapper(findAll));
orderRoutes.get('/:orderId', asyncWrapper(findById));

export default orderRoutes;
