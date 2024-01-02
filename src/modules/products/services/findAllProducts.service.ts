import { Products } from '@prisma/client';
import { db } from '../../../config';

export const findAllProducts = async <Key extends keyof Products>(
  filter: {
    id?: string;
    active?: boolean;
    name?: string;
    price?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
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
    'price',
    'description',
    'createdAt',
    'updatedAt',
    'active',
  ] as Key[]
): Promise<Pick<Products, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';

  const product = await db.products.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {
      ImageProducts: { select: { ImageName: true } },
    }),
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });

  return product as unknown as Pick<Products, Key>[];
};
