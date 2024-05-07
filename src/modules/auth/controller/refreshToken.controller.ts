import { Request, Response } from 'express';
import { refreshToken as refreshTokenService } from '../service';

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const result = await refreshTokenService({ refreshToken });
  res.json(result);
};
