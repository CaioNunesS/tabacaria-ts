import { User } from '@prisma/client';
import { db } from '../../../config';
import { throwError } from '../../../utils';
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
    const getUser = await db.user.findUnique({
      where: { id },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    });

    if (!getUser) throwError('Usuário não encontrado.', httpStatus.NOT_FOUND);

    return getUser as Pick<User, Key>;
  } catch (error) {
    throwError('Usuário não encontrado.', httpStatus.NOT_FOUND);
  }
};
