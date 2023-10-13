import { object, string } from 'zod';

export const productSchema = object({
  body: object({
    name: string({ required_error: 'Name é um campo obrigatório' }).trim(),
    price: string({ required_error: 'Price é um campo obrigatório' })
      .trim()
      .regex(
        /^\d+(\.\d{1,2})?$/,
        'O campo "price" deve ser um número válido, com no máximo duas casas decimáis'
      ),
    description: string({
      required_error: 'Description é um campo obrigatório',
    }).trim(),
  }),
});
