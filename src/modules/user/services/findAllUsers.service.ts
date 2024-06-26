import { User } from '@prisma/client';
import { db } from '../../../config';
import { throwError } from '../../../utils';
import httpStatus from 'http-status';

// Função para encontrar todos os usuários com base em filtros e opções
export const findAllUsers = async <Key extends keyof User>(
  filter: {
    id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    active?: boolean;
  },
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
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
): Promise<Pick<User, Key>[]> => {
  // Definindo valores padrão para opções, como limit, page e sortType
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';

  const customers = await db.user.findMany({
    where: filter,
    // Selecionando apenas as colunas especificadas em 'keys'
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });

  if (customers.length === 0)
    throwError('Usuário não encontrado.', httpStatus.NOT_FOUND);

  return customers as Pick<User, Key>[];
};
