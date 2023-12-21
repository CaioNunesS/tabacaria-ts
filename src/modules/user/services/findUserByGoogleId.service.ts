// Importando o tipo de usuário do Prisma
import { User } from '@prisma/client';

// Importando o objeto de conexão com o banco de dados (Prisma)
import { db } from '../../../config';

// Importando a função throwError do utilitário
import { throwError } from '../../../utils';

// Importando o módulo http-status para códigos de status HTTP
import httpStatus from 'http-status';

// Função para encontrar um usuário pelo Google ID
export const findUserByGoogleId = async <Key extends keyof User>(
  googleId: string,
  keys: Key[] = [
    'id',
    'name',
    'active',
    'email',
    'phoneNumber',
    'role',
    'googleId',
    'createdAt',
    'updatedAt',
  ] as Key[]
): Promise<Pick<User, Key> | undefined> => {
  // Consultando o banco de dados usando o Prisma para encontrar um usuário pelo Google ID
  const result = await db.user.findUnique({
    where: { googleId: googleId },
    // Selecionando apenas as colunas específicas do usuário
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });

  // Lançando um erro se nenhum usuário for encontrado
  if (!result) throwError('Usuário não encontrado', httpStatus.NOT_FOUND);

  // Retornando o usuário encontrado
  return result as Pick<User, Key>;
};
