import { object, string } from 'zod';
import { valueRegex } from '../../utils/regex';

export const couponSchema = object({
  body: object({
    title: string({ required_error: 'Title é um campo obrigatório' }),
    description: string({
      required_error: 'Description é um campo obrigatório',
    }),
    value: string({ required_error: 'Value é um campo obrigatório' }).regex(
      valueRegex,
      'O campo "value" deve ser um número válido, com no máximo duas casas decimáis'
    ),
  }),
});
