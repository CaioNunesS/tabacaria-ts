import 'dotenv/config';
import { createTransport, getTestMessageUrl } from 'nodemailer';
import { env } from '../../../env';

export type ISendMail = {
  to: string;
  subject: string;
  html: string;
};

export const sendMail = async ({ to, subject, html }: ISendMail) => {
  try {
    const transporter = createTransport({
      host: env.SMTP_HOST,
      port: parseInt(env.SMTP_PORT),
      secure: false,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: env.SMTP_FROM,
      to,
      subject,
      html,
    });

    return {
      message: info.messageId,
      preview: getTestMessageUrl(info),
    };
  } catch (error) {
    throw new Error('Error ao enviar email');
  }
};
