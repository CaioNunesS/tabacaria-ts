import { faker } from '@faker-js/faker';
import { ITwilio } from '../config';
import { ISendMail } from '../modules/notifications/email/email.service';
import { env } from '../env';
import { SentMessageInfo } from 'nodemailer';

export const sendSmsMock: ITwilio = {
  phone: '+5511943956693',
  message: faker.animal.cat(),
};

export const sendMailMock: ISendMail = {
  to: faker.internet.email(),
  subject: faker.word.sample(),
  html: faker.word.sample(),
};

export const createTransportMock: SentMessageInfo = {
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT),
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
};
