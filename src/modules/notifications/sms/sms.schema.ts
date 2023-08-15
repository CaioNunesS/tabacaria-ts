import { object, string } from 'zod'
import { phoneRegex } from '../../../utils/regex'

export const smsSchema = object({
  body: object({
    phone: string({ required_error: 'Phone é campo obrigatório' })
      .trim()
      .regex(phoneRegex, 'Número invalido'),
    name: string({ required_error: 'Name é um campo obrigatório' }),
  }),
})
