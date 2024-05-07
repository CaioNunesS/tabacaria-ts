import httpStatus from 'http-status';
import { db } from '../../../config';
import { hashToken, throwError } from '../../../utils';

type IAddRefreshTokenToWriteList = {
  jwtId: string;
  refreshToken: string;
  userId: string;
};

export const addRefreshTokenToWriteList = ({
  jwtId,
  refreshToken,
  userId,
}: IAddRefreshTokenToWriteList) => {
  try {
    return db.refreshToken.create({
      data: {
        id: jwtId,
        hashedToken: hashToken(refreshToken),
        userId,
      },
    });
  } catch (error) {
    throwError('Erro para adicionar refreshToken', httpStatus.BAD_REQUEST);
  }
};
