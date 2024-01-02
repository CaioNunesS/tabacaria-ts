import { Products } from '@prisma/client';
import { db } from '../../../config';

export const findProductByName = async <Key extends keyof Products>(
  name: string,
  keys: Key[] = [
    'id',
    'active',
    'name',
    'price',
    'description',
    'createdAt',
    'updatedAt',
  ] as Key[]
): Promise<Pick<Products, Key> | undefined> => {
  const result = await db.products.findFirst({
    where: { name },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });

  return result as Pick<Products, Key>;
};
