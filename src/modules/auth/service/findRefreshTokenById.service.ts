import httpStatus from 'http-status';
import { db } from '../../../config';
import { throwError } from '../../../utils';

export const findRefreshTokenById = (id: string) => {
  try {
    return db.refreshToken.findUnique({
      where: { id },
    });
  } catch (error) {
    throwError('Erro para buscar refreshToken', httpStatus.BAD_REQUEST);
  }
};
