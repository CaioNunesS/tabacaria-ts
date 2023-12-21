// Importando o tipo de usuário do Prisma
import { User } from '@prisma/client';

// Importando o objeto de conexão com o banco de dados (Prisma)
import { db } from '../../../config';

// Importando a função throwError do utilitário
import { throwError } from '../../../utils';

// Importando o módulo http-status para códigos de status HTTP
import httpStatus from 'http-status';

// Função para encontrar um usuário pelo ID
export const findUserById = async <Key extends keyof User>(
  id: string,
  keys: Key[] = [
    'id',
    'name',
    'active',
    'email',
    'phoneNumber',
    'role',
    'createdAt',
    'updatedAt',
  ] as Key[]
): Promise<Pick<User, Key> | undefined> => {
  try {
    // Consultando o banco de dados usando o Prisma para encontrar um usuário pelo ID
    const getUser = await db.user.findUnique({
      where: { id },
      // Selecionando apenas as colunas específicas do usuário
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    });

    // Lançando um erro se nenhum usuário for encontrado
    if (!getUser) throwError('Usuário não encontrado.', httpStatus.NOT_FOUND);

    // Retornando o usuário encontrado
    return getUser as Pick<User, Key>;
  } catch (error) {
    // Lançando um erro se ocorrer um erro durante a consulta
    throwError('Usuário não encontrado.', httpStatus.NOT_FOUND);
  }
};
