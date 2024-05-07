import { Coupons } from '@prisma/client';
import { db } from '../../../config/index';

export const findAllCoupons = async <Key extends keyof Coupons>(
  filter: {
    id?: string;
    title?: string;
    description?: string;
    value?: string;
    createdAt?: Date;
    updatedAt?: Date;
    revoked?: boolean;
  },
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'title',
    'description',
    'value',
    'createdAt',
    'updatedAt',
    'revoked',
  ] as Key[]
): Promise<Pick<Coupons, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';

  const result = await db.coupons.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });

  return result as Pick<Coupons, Key>[];
};
