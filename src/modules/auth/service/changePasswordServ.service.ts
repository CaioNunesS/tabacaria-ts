import { ZodError } from 'zod';
import { validateChangePassword } from '../schemas/auth.schema';
import { throwError } from '../../../utils';
import httpStatus from 'http-status';
import { updateUser } from '../../user/services';

export interface IChangePassword {
  newPassword: string;
  confirmNewPassword: string;
}

export const changePasswordServ = async (
  id: string,
  changedPassword: IChangePassword
) => {
  try {
    validateChangePassword(changedPassword);
  } catch (error) {
    if (error instanceof ZodError) {
      throwError(error.message, httpStatus.BAD_REQUEST);
    }
    throwError('Erro no servidor', httpStatus.INTERNAL_SERVER_ERROR);
  }

  const { confirmNewPassword, newPassword } = changedPassword;
  if (newPassword !== confirmNewPassword) {
    throwError('As senhas não são iguais', httpStatus.BAD_REQUEST);
  }

  return await updateUser(id, { password: newPassword });
};
