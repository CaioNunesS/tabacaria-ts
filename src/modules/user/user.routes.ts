import { Router } from 'express';
import {
  deleteOne,
  findAll,
  findOne,
  findOneByEmail,
  profile,
  updateOne,
} from './controllers';
import {
  asyncWrapper,
  isAuthenticated,
  validate,
} from '../../middleware/index';
import { userUpdateSchema } from './schemas/user.schema';

const userRoutes = Router();

userRoutes.get('/profile', isAuthenticated, profile);
userRoutes.get('/:userId', asyncWrapper(findOne));
userRoutes.get('/', asyncWrapper(findAll));
userRoutes.get('/', asyncWrapper(findOneByEmail));
userRoutes.put('/:userId', validate(userUpdateSchema), asyncWrapper(updateOne));
userRoutes.delete('/:userId', asyncWrapper(deleteOne));

export default userRoutes;
