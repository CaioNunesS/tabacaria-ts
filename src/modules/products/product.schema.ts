import { object, string } from 'zod'

export const productSchema = object({
  body: object({
    name: string({ required_error: 'Name é obrigatório' }),
    price: string({ required_error: 'Preço é obrigatório' }),
    photo: string().optional(),
    description: string({ required_error: 'Descrição é obrigatória' }),
  }),
})
