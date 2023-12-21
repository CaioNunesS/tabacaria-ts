// Importando o módulo http-status para códigos de status HTTP
import httpStatus from 'http-status';

// Importando o objeto de conexão com o banco de dados (Prisma)
import { db } from '../../../config';

// Importando a função throwError do utilitário
import { throwError } from '../../../utils';

// Função para encontrar um usuário pelo número de telefone
export const findUserByPhoneNumber = async (phoneNumber: string) => {
  try {
    // Consultando o banco de dados usando o Prisma para encontrar um usuário pelo número de telefone
    const user = await db.user.findFirst({
      where: { phoneNumber: phoneNumber },
      // Selecionando apenas as colunas específicas do usuário (excluindo a senha)
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
        password: false, // Excluindo a senha da seleção
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
