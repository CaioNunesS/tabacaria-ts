import { User } from '@prisma/client';
import { db } from '../../../config';
import { throwError } from '../../../utils';
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
  const result = await db.user.findUnique({
    where: { googleId: googleId },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });

  if (!result) throwError('Usuário não encontrado', httpStatus.NOT_FOUND);

  return result as Pick<User, Key>;
};
