import { object, string } from 'zod';

export const couponSchema = object({
  body: object({
    title: string({ required_error: 'Title é obrigatório' }),
    description: string({ required_error: 'Description é obrigatório' }),
    value: string({ required_error: 'Value é obrigatório' }),
  }),
});
