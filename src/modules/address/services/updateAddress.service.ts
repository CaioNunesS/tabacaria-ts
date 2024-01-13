import { Address, Prisma } from '@prisma/client';
import { throwError } from '../../../utils';
import httpStatus from 'http-status';
import { db } from '../../../config';
import { findAddressById } from './findAddressById.service';

export interface IUpdateAddress {
  street?: string;
  city?: string;
  neighborhood?: string;
  state?: string;
  number?: string;
  zipCode?: string;
  userId?: string;
  AdditionalData?: string;
}

export const updateAddress = async <Key extends keyof Address>(
  id: string,
  updateBody: Prisma.AddressUpdateInput,
  keys: Key[] = [
    'street',
    'city',
    'state',
    'neighborhood',
    'number',
    'zipCode',
    'AdditionalData',
    'userId',
    'createdAt',
    'updatedAt',
  ] as Key[]
): Promise<IUpdateAddress | null> => {
  const addressData = await findAddressById(id, [
    'id',
    'street',
    'state',
    'city',
    'neighborhood',
    'number',
    'zipCode',
    'AdditionalData',
    'userId',
  ]);
  if (!addressData) {
    throwError('Endereço não encontrado', httpStatus.NOT_FOUND);
  }

  const result = await db.address.update({
    where: { id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });

  return result as unknown as IUpdateAddress | null;
};
