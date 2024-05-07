import httpStatus from 'http-status';
import { generateVerificationEmailHTML } from '../../../templates/email/verificationCode';
import { verificationCodeSms } from '../../../templates/sms/verificationCode';
import { throwError } from '../../../utils';
import { generateRandomCode } from '../../../utils/generateRandomCode';
import { sendMail } from '../../notifications/email/email.service';
import { sendSms } from '../../notifications/sms/sms.service';
import {
  findUserByEmail,
  findUserByPhoneNumber,
  updateUser,
} from '../../user/services';

export const sendVerificationCode = async (email?: string, phone?: string) => {
  const code = generateRandomCode(6);
  try {
    if (email) {
      const getUser = await findUserByEmail(email);
      if (getUser) {
        const { id } = getUser;

        const emailBody = {
          to: email,
          subject: 'Código de verificação',
          html: generateVerificationEmailHTML(code),
        };
        await sendMail(emailBody);
        await updateUser(id, { verificationCode: code });
      }
    }
    if (phone) {
      const getUser = await findUserByPhoneNumber(phone);

      if (getUser && getUser !== null) {
        const { phoneNumber, id, name } = getUser;

        const message = await verificationCodeSms({ name, code });

        if (phoneNumber) {
          await sendSms({ message, phone: `+55${phoneNumber}` });
          await updateUser(id, { verificationCode: code });
        }
      } else {
        throwError(
          'Não foi possivel completar a açãooo',
          httpStatus.BAD_REQUEST
        );
      }
    }
  } catch (error) {
    throwError('Não foi possivel completar a ação', httpStatus.BAD_REQUEST);
  }
};
