import { object, string } from 'zod';

export const orderSchema = object({
  body: object({
    products: string({
      required_error: 'products é um campo obrigatório',
    })
      .array()
      .nonempty(),
  }),
  couponId: string().optional(),
});
