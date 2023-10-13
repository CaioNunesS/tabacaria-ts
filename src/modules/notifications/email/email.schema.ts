import { object, string } from 'zod';
import { emailRegex } from '../../../utils/regex';

export const sendMailSchema = object({
  body: object({
    name: string({
      required_error: 'Campo name é obrigatório',
    }).trim(),
    to: string({
      required_error: 'Campo to é obrigatório',
    })
      .trim()
      .regex(emailRegex, 'Formato de email inválido'),
    subject: string({
      required_error: 'Campo subject é obrigatório',
    }).trim(),
  }),
});
