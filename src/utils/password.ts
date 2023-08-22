import { findUserByEmail } from '../modules/user/user.service';
import { throwError } from './index';
import { compare } from 'bcrypt';

export const comparePassword = async (email: string, password: string) => {
  try {
    const existUser = await findUserByEmail(email);

    if (!existUser) {
      throwError('Usuário não encontrado', 404);
    }

    if (existUser) {
      const isPasswordMatch = await compare(password, existUser.password);
      if (!isPasswordMatch) throwError('Senha ou email incorreto', 404);
    }

    return existUser;
  } catch (error) {
    throwError('Usuário não encontrado', 404);
  }
};
