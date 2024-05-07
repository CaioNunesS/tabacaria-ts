import httpStatus from 'http-status';
import { hashToken, throwError } from '../../../utils';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { findRefreshTokenById } from './findRefreshTokenById.service';
import { findUserById } from '../../user/services';
import { deleteRefreshToken } from './deleteRefreshToken.service';
import { returnResponse } from './returnResponse.service';
import { env } from '../../../env';

type IRefreshToken = {
  refreshToken: string;
};

export const refreshToken = async ({ refreshToken }: IRefreshToken) => {
  try {
    if (!refreshToken)
      throwError('refreshToken não informado', httpStatus.BAD_REQUEST);

    const payload = jwt.verify(
      refreshToken,
      env.JWT_REFRESH_SECRET || 'afahfbhafhaf'
    ) as JwtPayload;

    const savedRefreshToken = await findRefreshTokenById(payload.jwtId);

    if (!savedRefreshToken || savedRefreshToken.revoked === true)
      throwError('refreshToken inválido', httpStatus.BAD_REQUEST);

    const hashedToken = hashToken(refreshToken);

    if (savedRefreshToken && hashedToken !== savedRefreshToken.hashedToken)
      throwError('refreshToken inválido', httpStatus.BAD_REQUEST);

    const user = await findUserById(payload.userId);

    if (!user) throwError('Usuário não encontrado', httpStatus.NOT_FOUND);
    if (savedRefreshToken) {
      await deleteRefreshToken(savedRefreshToken.id);
    }
    if (user) {
      return await returnResponse(user);
    }
  } catch (error) {
    throwError('Erro ao autenticar usuário', httpStatus.BAD_REQUEST);
  }
};
