import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { registerWithGoogle } from './google.service';

import { env } from '../../../../env';
// import { throwError } from '../../../../utils';

export const handleGoogleAuth = async (req: Request, res: Response) => {
  try {
    const { id, firstName, lastName, email } = req.user;
    if (req.user) {
      const token = jwt.sign(req.user, env.JWT_KEY);
      const responseObject = {
        token: token,
        ...req.user,
      };

      await registerWithGoogle({ id, firstName, lastName, email });
      res.send(responseObject);
    }
  } catch (error) {
    console.log('error =====>', error);
  }
};
