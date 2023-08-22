import { Request, Response } from 'express';
import {
  register,
  authenticatedUserByEmailAndPassword,
  refreshToken as refreshTokenService,
  revokeTokens,
} from './auth.service';

export const create = async (req: Request, res: Response) => {
  const { email, password, name, gitHubId } = req.body;
  const result = await register({ email, password, name, gitHubId });

  res.json(result);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authenticatedUserByEmailAndPassword(email, password);

  return res.json(result);
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const result = await refreshTokenService({ refreshToken });
  res.json(result);
};

export const revokeRefreshToken = async (req: Request, res: Response) => {
  const { userId } = req.body;

  await revokeTokens(userId);

  return res.json({
    message: `Token revogado para o usuário com o id #${userId}`,
  });
};
