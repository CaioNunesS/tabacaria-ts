import { Address } from '@prisma/client';
import { db } from '../../../config';

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
