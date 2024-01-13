import { ITwilio } from '../config';
import { ISendMail } from '../modules/notifications/email/email.service';
import { SentMessageInfo } from 'nodemailer';
export declare const sendSmsMock: ITwilio;
export declare const sendMailMock: ISendMail;
export declare const createTransportMock: SentMessageInfo;
