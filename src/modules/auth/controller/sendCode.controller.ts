import { Request, Response } from 'express';
import { sendVerificationCode } from '../service';

export const sendCode = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;
  await sendVerificationCode(email, phoneNumber);

  return res.json({
    message: 'Código de verificação enviado com sucesso',
  });
};
