import { Products } from '@prisma/client';
import { db } from '../../../config';
import { throwError } from '../../../utils';
import httpStatus from 'http-status';

export const findProductById = async <Key extends keyof Products>(
  id: string,
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
  const getProduct = await db.products.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {
      ImageProducts: { select: { ImageName: true } },
    }),
  });

  if (!getProduct) throwError('Produto não encontrado', httpStatus.NOT_FOUND);

  return getProduct as unknown as Pick<Products, Key>;
};
