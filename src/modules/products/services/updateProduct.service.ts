import { Prisma, Products } from '@prisma/client';
import { findProductById } from './findProductById.service';
import { throwError } from '../../../utils';
import httpStatus from 'http-status';
import { db } from '../../../config';

type updateProductResponse = {
  id?: string;
  name: string;
  price: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const updateProduct = async <Key extends keyof Products>(
  id: string,
  updateBody: Prisma.ProductsUpdateInput,
  keys: Key[] = ['id', 'name', 'price', 'description', 'active'] as Key[]
): Promise<updateProductResponse | null> => {
  const product = await findProductById(id, [
    'id',
    'name',
    'price',
    'description',
    'active',
  ]);

  if (!product) throwError('Produto não encontrado', httpStatus.NOT_FOUND);

  const result = await db.products.update({
    where: { id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {
      ImageProducts: { select: { ImageName: true } },
    }),
  });
  return result as unknown as updateProductResponse | null;
};
