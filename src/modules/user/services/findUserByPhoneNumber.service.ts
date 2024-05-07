import httpStatus from 'http-status';
import { db } from '../../../config';
import { throwError } from '../../../utils';

// Função para encontrar um usuário pelo número de telefone
export const findUserByPhoneNumber = async (phoneNumber: string) => {
  try {
    const user = await db.user.findFirst({
      where: { phoneNumber: phoneNumber },
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
        password: false,
        verificationCode: true,
      },
    });

    return user;
  } catch (error) {
    throwError('Usuário não encontrado.', httpStatus.NOT_FOUND);
  }
};
