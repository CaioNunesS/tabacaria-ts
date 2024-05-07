import { Router } from 'express';
import { asyncWrapper, validate } from '../../middleware/index';
import { create, findAll, findById } from './controllers';
import { couponSchema } from './schemas/coupon.schema';

const couponRoutes = Router();

couponRoutes.post('/', validate(couponSchema), asyncWrapper(create));
couponRoutes.get('/', asyncWrapper(findAll));
couponRoutes.get('/:couponId', asyncWrapper(findById));

export default couponRoutes;
