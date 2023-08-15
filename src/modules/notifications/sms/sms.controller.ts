import { Request, Response } from 'express'
import { welcomeSMSTemplate } from '../../../templates/sms/welcomeSms'
import { sendSms } from './sms.service'
import httpStatus from 'http-status'

export const create = async (req: Request, res: Response) => {
  const { name, phone } = req.body
  const message = await welcomeSMSTemplate({ name })

  await sendSms({ message, phone })

  return res
    .status(httpStatus.CREATED)
    .json({ message: `Sms enviado para o número ${phone}` })
}
