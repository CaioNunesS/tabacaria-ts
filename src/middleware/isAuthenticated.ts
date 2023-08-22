import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { throwError } from '../utils/index';

import { env } from '../env';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401);
    throwError('Não autorizado', 401);
  }

  try {
    if (authorization) {
      const [bearer, token] = authorization.split(' ');

      if (bearer !== 'Bearer') {
        res.status(401).json('Token inválido');
      }

      const payload = jwt.verify(
        token,
        env.JWT_ACCESS_SECRET
      ) as jwt.JwtPayload;

      req.payload = payload;
    }
  } catch (error: any) {
    res.status(401);
    if (error.name === 'TokenExpiredError') {
      throwError('Não autorizado', 401);
    }
  }
  return next();
};
