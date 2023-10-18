import { Prisma, Address } from '@prisma/client';
import { db } from '../../config/index';
import { throwError } from '../../utils';
import httpStatus from 'http-status';
import { findUserById } from '../user/user.service';

export interface ICreateAddress {
  id?: string;
  street: string;
  city: string;
  state: string;
  neighborhood: string;
  number: string;
  zipCode: string;
  userId: string;
  AdditionalData?: string | null;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

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

export const createAddress = async ({
  street,
  city,
  neighborhood,
  number,
  state,
  zipCode,
  AdditionalData,
  userId,
}: ICreateAddress) => {
  await findUserById(userId);

  const result = await db.address.create({
    data: {
      street,
      city,
      neighborhood,
      state,
      number,
      zipCode,
      AdditionalData,
      userId,
      active: true,
    },
  });

  return result;
};

export const findAddressByUserId = async <Key extends keyof Address>(
  userId: string,
  keys: Key[] = [
    'id',
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
    'active',
  ] as Key[]
): Promise<Pick<Address, Key> | undefined> => {
  const addresses = await db.address.findMany({
    where: { userId },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });

  return addresses as unknown as Pick<Address, Key>;
};

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

export const findAddressById = async <Key extends keyof Address>(
  id: string,
  keys: Key[] = [
    'id',
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
    'active',
  ] as Key[]
): Promise<Pick<Address, Key>> => {
  const result = await db.address.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });

  return result as Pick<Address, Key>;
};

export const deleteAddress = async (id: string) => {
  const addressData = await findAddressById(id);
  if (!addressData) {
    throwError('Endereço não encontrado', httpStatus.NOT_FOUND);
  }

  return await db.address.delete({ where: { id } });
};
