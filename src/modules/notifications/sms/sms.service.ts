import { twilioConfig, ITwilio } from '../../../config/index';
import { throwError } from '../../../utils/index';

export const sendSms = async ({ message, phone }: ITwilio) => {
  try {
    return await twilioConfig({ message, phone });
  } catch (error) {
    throwError('Erro ao enviar sms', 400);
  }
};
