import httpStatus from 'http-status';
import { throwError } from '../../../utils';
import {
  findUserByEmail,
  findUserByPhoneNumber,
  updateUser,
} from '../../user/services';

export const verifyCode = async (
  code: string,
  email?: string,
  phoneNumber?: string
) => {
  if (email) {
    const userData = await findUserByEmail(email);
    if (userData) {
      const { id, verificationCode } = userData;

      if (verificationCode !== code) {
        throwError('Código inválido', httpStatus.BAD_REQUEST);
      }

      await updateUser(id, { verificationCode: null });

      return 'okay';
    }
  }
  if (phoneNumber) {
    const userData = await findUserByPhoneNumber(phoneNumber);
    if (userData) {
      const { id, verificationCode } = userData;

      if (verificationCode !== code) {
        throwError('Código inválido', httpStatus.BAD_REQUEST);
      }

      await updateUser(id, { verificationCode: null });

      return 'okay';
    }
  }
};
