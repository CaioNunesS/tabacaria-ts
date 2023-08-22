import { Router } from 'express';
import {
  deleteOne,
  findAll,
  findOne,
  findOneByEmail,
  profile,
  updateOne,
} from './user.controller';
import { isAuthenticated } from '../../middleware/index';

const userRoutes = Router();

userRoutes.get('/profile', isAuthenticated, profile);
userRoutes.get('/:userId', findOne);
userRoutes.get('/', findAll);
userRoutes.get('/', findOneByEmail);
userRoutes.put('/:userId', updateOne);
userRoutes.delete('/:userId', deleteOne);

export default userRoutes;
