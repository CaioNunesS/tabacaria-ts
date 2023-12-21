// Importando o módulo http-status para códigos de status HTTP
import httpStatus from 'http-status';

// Importando o objeto de conexão com o banco de dados (Prisma)
import { db } from '../../../config';

// Importando a função throwError do utilitário
import { throwError } from '../../../utils';

// Função para encontrar um usuário pelo email
export const findUserByEmail = async (email: string) => {
  try {
    // Consultando o banco de dados usando o Prisma para encontrar um usuário pelo email
    const user = await db.user.findUnique({
      where: {
        email,
      },
      // Selecionando apenas as colunas específicas do usuário
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

    // Retornando o usuário encontrado
    return user;
  } catch (error) {
    // Lançando um erro se ocorrer um erro durante a consulta
    throwError('Usuário não encontrado.', httpStatus.NOT_FOUND);
  }
};
