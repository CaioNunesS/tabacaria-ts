import { sendMail } from './email.service'
import { welcomeMailTemplate } from '../../../templates/email/welcomeEmail'
import { Request, Response } from 'express'

export const sendMailWelcome = async (req: Request, res: Response) => {
  const { name, to, subject } = req.body

  const html = welcomeMailTemplate({ name })

  const result = await sendMail({
    html,
    subject,
    to,
  })

  return res.json({ data: result })
}
