import { db } from '../../../config';
import { findUserById } from '../../user/services';

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
