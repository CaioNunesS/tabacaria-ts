import { Request, Response } from 'express';
import { revokeTokens } from '../service';

export const revokeRefreshToken = async (req: Request, res: Response) => {
  const { userId } = req.body;

  await revokeTokens(userId);

  return res.json({
    message: `Token revogado para o usuário com o id #${userId}`,
  });
};
