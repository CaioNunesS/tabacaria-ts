import httpStatus from 'http-status';
import { findProductByName } from './findProductByName.service';
import { throwError } from '../../../utils';
import { db } from '../../../config';

export type IcreateProduct = {
  id?: string;
  active?: boolean;
  name: string;
  price: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const createProduct = async ({
  name,
  price,
  description,
}: IcreateProduct) => {
  const getProduct = await findProductByName(name);
  if (getProduct) {
    throwError('Produto já cadastrado', httpStatus.BAD_REQUEST);
  }

  const result = await db.products.create({
    data: {
      name,
      price,
      description,
    },
  });

  return result;
};
