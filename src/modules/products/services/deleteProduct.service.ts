import { Products } from '@prisma/client';
import { db } from '../../../config';
import { throwError } from '../../../utils';
import { findProductById } from './findProductById.service';
import httpStatus from 'http-status';

export const deleteProduct = async (id: string): Promise<Products> => {
  const product = await findProductById(id);

  if (!product) throwError('Produto não encontrado', httpStatus.NOT_FOUND);

  return await db.products.delete({ where: { id } });
};
