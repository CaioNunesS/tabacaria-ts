import { object, string } from 'zod';

export const productUpdateSchema = object({
  body: object({
    name: string({ required_error: 'Nome deve ser uma string' })
      .trim()
      .min(3, 'O nome deve ter ao menos 3 caracteres')
      .optional(),

    price: string({ required_error: 'Preço deve ser uma string' })
      .trim()
      .regex(
        /^\d+(\.\d{1,2})?$/,
        'O campo "preço" deve ser um número válido, com no máximo duas casas decimáis'
      )
      .optional(),
    description: string({
      required_error: 'Descrição é um campo obrigatório',
    })
      .trim()
      .min(3, 'A descrição deve ter ao menos 3 caracteres')
      .optional(),
  }),
});
