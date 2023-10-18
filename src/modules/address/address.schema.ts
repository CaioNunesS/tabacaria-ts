import { object, string } from 'zod';
import { onlyNumbersRegex, cepRegex } from '../../utils/regex';

export const addressSchema = object({
  body: object({
    street: string({ required_error: 'Rua é um campo obrigatório' }).trim(),
    number: string({ required_error: 'Número é um campo obrigatório' })
      .trim()
      .regex(onlyNumbersRegex, {
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

export const addressUpdateSchema = object({
  body: object({
    street: string({ required_error: 'Rua é deve ser uma string' })
      .trim()
      .optional(),
    number: string({ required_error: 'Número é deve ser uma string' })
      .trim()
      .regex(onlyNumbersRegex, {
        message:
          'O número informado é inválido. Caso tenha letras, informe nas "informações adicionais"',
      })
      .optional(),
    city: string({ required_error: 'cidade é deve ser uma string' })
      .trim()
      .optional(),
    state: string({ required_error: 'estado é deve ser uma string' })
      .trim()
      .optional(),
    neighborhood: string({
      required_error: 'bairro é deve ser uma string',
    })
      .trim()
      .optional(),
    zipCode: string({
      required_error: 'cep é deve ser uma string',
    })
      .trim()
      .regex(cepRegex, { message: 'O cep informado não é válido' })
      .optional(),
    AdditionalData: string({
      required_error: 'complemento deve ser uma string',
    })
      .nullable()
      .optional(),
    userId: string({ required_error: 'userId é deve ser uma string' }).trim(),
  }),
});
