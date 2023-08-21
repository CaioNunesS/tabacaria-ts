import { object, string } from 'zod'

export const productSchema = object({
  body: object({
    name: string({ required_error: 'Name é obrigatório' }),
    price: string({ required_error: 'Price é obrigatório' }).regex(
      /^\d+(\.\d{1,2})?$/,
      'o campo "price" deve ser um número válido, com no máximo duas casas decimáis',
    ),
    description: string({ required_error: 'Description é obrigatório' }),
  }),
})
