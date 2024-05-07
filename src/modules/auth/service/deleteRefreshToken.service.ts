import httpStatus from 'http-status';
import { db } from '../../../config';
import { throwError } from '../../../utils';

export const deleteRefreshToken = (id: string) => {
  try {
    return db.refreshToken.update({
      where: { id },
      data: {
        revoked: true,
      },
    });
  } catch (error) {
    throwError('Erro para buscar refreshToken', httpStatus.BAD_REQUEST);
  }
};
