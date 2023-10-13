import { object, string } from 'zod';
import { apenasNumerosRegex, cepRegex } from '../../utils/regex';

export const addressSchema = object({
  body: object({
    street: string({ required_error: 'Street é um campo obrigatório' }).trim(),
    number: string({ required_error: 'Number é um campo obrigatório' })
      .trim()
      .regex(apenasNumerosRegex, {
        message:
          'O número informado é inválido. Caso tenha letras, informe nas "informações adicionais"',
      }),
    city: string({ required_error: 'city é um campo obrigatório' }).trim(),
    state: string({ required_error: 'state é um campo obrigatório' }).trim(),
    neighborhood: string({
      required_error: 'Neighborhood é um campo obrigatório',
    }).trim(),
    zipCode: string({
      required_error: 'zipCode é um campo obrigatório',
    })
      .trim()
      .regex(cepRegex, { message: 'O cep informado não é válido' }),
    AdditionalDAta: string({
      required_error: 'AdditionalDAta é um campo obrigatório',
    }).optional(),
    userId: string({ required_error: 'userId é um campo obrigatório' }).trim(),
  }),
});
