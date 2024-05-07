import httpStatus from 'http-status';
import { comparePassword, throwError } from '../../../utils';
import { returnResponse } from './returnResponse.service';

export const authenticatedUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const getUser = await comparePassword(email, password);

    if (getUser) {
      return await returnResponse(getUser);
    }
  } catch (error) {
    throwError('Erro ao autenticar usuário', httpStatus.BAD_REQUEST);
  }
};
