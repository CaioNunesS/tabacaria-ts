import httpStatus from 'http-status';
import { db } from '../../../config';
import { throwError } from '../../../utils';
import { findAddressById } from './findAddressById.service';

export const deleteAddress = async (id: string) => {
  const addressData = await findAddressById(id);
  if (!addressData) {
    throwError('Endereço não encontrado', httpStatus.NOT_FOUND);
  }

  return await db.address.delete({ where: { id } });
};
