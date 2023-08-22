import { object, string } from 'zod';
import { phoneRegex } from '../../../utils/regex';

export const smsSchema = object({
  body: object({
    phone: string({ required_error: 'Phone é um campo obrigatório' })
      .trim()
      .regex(phoneRegex, 'Número de telefone inválido'),
    name: string({ required_error: 'Name é um campo obrigatório' }).trim(),
  }),
});
