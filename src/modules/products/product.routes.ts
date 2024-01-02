import { Router } from 'express';
import { create, findById, findAll, deleteOne, updateOne } from './controllers';
import { asyncWrapper, validate } from '../../middleware/index';
import { productSchema, productUpdateSchema } from './schemas';
const productRoutes = Router();

productRoutes.post('/', validate(productSchema), asyncWrapper(create));
productRoutes.get('/', asyncWrapper(findAll));
productRoutes.get('/:productId', asyncWrapper(findById));
productRoutes.delete('/:productId', asyncWrapper(deleteOne));
productRoutes.put(
  '/:productId',
  validate(productUpdateSchema),
  asyncWrapper(updateOne)
);

export default productRoutes;
