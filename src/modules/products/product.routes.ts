import { Router } from 'express';
import {
  create,
  findById,
  findAll,
  deleteOne,
  updateOne,
} from './product.controller';
import { asyncWrapper, validate } from '../../middleware/index';
import { productSchema } from './product.schema';
const productRoutes = Router();

productRoutes.post('/', validate(productSchema), asyncWrapper(create));
productRoutes.get('/', asyncWrapper(findAll));
productRoutes.get('/:productId', asyncWrapper(findById));
productRoutes.delete('/:productId', asyncWrapper(deleteOne));
productRoutes.put('/:productId', asyncWrapper(updateOne));

export default productRoutes;
