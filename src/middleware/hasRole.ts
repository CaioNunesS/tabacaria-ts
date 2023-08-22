import { NextFunction, Request, Response } from 'express';
import { findUserById } from '../modules/user/user.service';

export const hasRole =
  (roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.payload;
      const user = await findUserById(userId);

      if (user && !roles.includes(user.role))
        return res.status(401).json({ message: 'Unauthorized' });

      return next();
    } catch (error: any) {
      throw new Error(error);
    }
  };
