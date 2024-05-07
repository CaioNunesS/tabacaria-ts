// Importando módulos necessários
import httpStatus from 'http-status';
import { findUserById } from './findUserById.service';
import { throwError } from '../../../utils';
import { db } from '../../../config';
import { User } from '@prisma/client';

// Função para deletar um usuário pelo ID
export const deleteUser = async (userId: string): Promise<User> => {
  const user = await findUserById(userId, ['id']);

  if (!user) throwError('Usuário não encontrado', httpStatus.NOT_FOUND);

  return await db.user.delete({ where: { id: userId } });
};
