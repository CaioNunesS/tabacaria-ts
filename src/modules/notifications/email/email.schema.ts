import { object, string } from 'zod';

export const sendMailSchema = object({
  body: object({
    name: string({
      required_error: 'Name é obrigatório',
    }),
    to: string({
      required_error: 'To é obrigatório',
    }),
    subject: string({
      required_error: 'Subject é obrigatório',
    }),
  }),
});
