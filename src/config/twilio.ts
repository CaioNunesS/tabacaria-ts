import client from 'twilio';
import { throwError } from '../utils';

import { env } from '../env';

const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = env.TWILIO_AUTH_TOKEN;
const fromPhone = env.TWILIO_PHONE;

export type ITwilio = {
  phone: string;
  message: string;
};

export const twilioConfig = async ({ phone, message }: ITwilio) => {
  try {
    const result = await client(accountSid, authToken).messages.create({
      body: message,
      to: phone,
      from: fromPhone,
    });
    return {
      status: result.status,
      id: result.sid,
    };
  } catch (error) {
    throwError('Erro ao enviar SMS com o TWILIO', 400);
  }
};
