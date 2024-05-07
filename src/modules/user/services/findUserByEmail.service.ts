import httpStatus from 'http-status';
import { db } from '../../../config';
import { throwError } from '../../../utils';

// Função para encontrar um usuário pelo email
export const findUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        active: true,
        email: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        gitHubId: true,
        googleId: true,
        password: true,
        verificationCode: true,
      },
    });

    return user;
  } catch (error) {
    throwError('Usuário não encontrado.', httpStatus.NOT_FOUND);
  }
};
