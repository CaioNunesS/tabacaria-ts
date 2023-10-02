import { Router } from 'express';
import passport from 'passport';

import { validate, asyncWrapper } from './../../middleware/index';
import {
  changePassword,
  create,
  login,
  refreshToken,
  revokeRefreshToken,
  sendCode,
  verificationCodeSended,
} from './auth.controller';
import { handleGoogleAuth } from './OAuth/google/google.controller';

import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  revokeTokenSchema,
} from './auth.schema';

const authRoutes = Router();

authRoutes.post('/', validate(registerSchema), asyncWrapper(create));
authRoutes.post('/login', validate(loginSchema), asyncWrapper(login));
authRoutes.post(
  '/refresh-token',
  validate(refreshTokenSchema),
  asyncWrapper(refreshToken)
);
authRoutes.post(
  '/logout',
  validate(revokeTokenSchema),
  asyncWrapper(revokeRefreshToken)
);
authRoutes.post('/send-verification-code', asyncWrapper(sendCode));

authRoutes.post('/verify-code', asyncWrapper(verificationCodeSended));
authRoutes.post('/change-password/:id', asyncWrapper(changePassword));

authRoutes.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRoutes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  handleGoogleAuth
);

export default authRoutes;
