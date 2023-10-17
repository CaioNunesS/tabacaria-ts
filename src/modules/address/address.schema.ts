import { object, string } from 'zod';
import { apenasNumerosRegex, cepRegex } from '../../utils/regex';

export const addressSchema = object({
  body: object({
    street: string({ required_error: 'Rua é um campo obrigatório' }).trim(),
    number: string({ required_error: 'Número é um campo obrigatório' })
      .trim()
      .regex(apenasNumerosRegex, {
        message:
          'O número informado é inválido. Caso tenha letras, informe nas "informações adicionais"',
      }),
    city: string({ required_error: 'cidade é um campo obrigatório' }).trim(),
    state: string({ required_error: 'estado é um campo obrigatório' }).trim(),
    neighborhood: string({
      required_error: 'bairro é um campo obrigatório',
    }).trim(),
    zipCode: string({
      required_error: 'cep é um campo obrigatório',
    })
      .trim()
      .regex(cepRegex, { message: 'O cep informado não é válido' }),
    AdditionalData: string({
      required_error: 'complemento deve ser uma string',
    })
      .nullable()
      .optional(),
    userId: string({ required_error: 'userId é um campo obrigatório' }).trim(),
  }),
});
