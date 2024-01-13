import { Address } from '@prisma/client';
import { db } from '../../../config';

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
