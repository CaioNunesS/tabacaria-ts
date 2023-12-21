// Importando módulos necessários
import httpStatus from 'http-status';

// Importando o serviço para encontrar um usuário por ID
import { findUserById } from './findUserById.service';

// Importando a função throwError do utilitário
import { throwError } from '../../../utils';

// Importando o objeto de conexão com o banco de dados (Prisma)
import { db } from '../../../config';

// Importando o tipo de usuário do Prisma
import { User } from '@prisma/client';

// Função para deletar um usuário pelo ID
export const deleteUser = async (userId: string): Promise<User> => {
  // Buscando o usuário pelo ID
  const user = await findUserById(userId, ['id']);

  // Se o usuário não existir, lançar um erro indicando que o usuário não foi encontrado
  if (!user) throwError('Usuário não encontrado', httpStatus.NOT_FOUND);

  // Deletando o usuário do banco de dados usando o Prisma
  return await db.user.delete({ where: { id: userId } });
};
