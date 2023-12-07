import { object, string } from 'zod';
import { emailRegex, onlyLettersRegex, phoneRegex } from '../../utils/regex';

export const userUpdateSchema = object({
  body: object({
    name: string({
      required_error: 'Nome deve ser uma string',
    })
      .trim()
      .regex(onlyLettersRegex, { message: 'Apenas letras são aceitas no nome' })
      .min(3, 'O nome deve ter ao menos 3 caracteres')
      .optional(),
    email: string({
      required_error: 'Email deve ser uma string',
    })
      .trim()
      .email({ message: 'Email inválido' })
      .regex(emailRegex, { message: 'Email inválido' })
      .optional(),
    phoneNumber: string({
      required_error: 'O celular é um campo obrigatório',
    })
      .regex(phoneRegex, { message: 'O telefone informado é inválido' })
      .optional(),
  }),
});
