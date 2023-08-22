import { object, string } from 'zod';

export const orderSchema = object({
  body: object({
    products: string({
      required_error: 'Campo Produto é obrigatório',
    })
      .array()
      .nonempty(),
  }),
  couponId: string().optional(),
});
