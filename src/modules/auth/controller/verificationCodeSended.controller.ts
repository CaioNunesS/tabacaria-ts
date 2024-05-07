import { Request, Response } from 'express';
import { verifyCode } from '../service';

export const verificationCodeSended = async (req: Request, res: Response) => {
  const { code, email, phoneNumber } = req.body;

  await verifyCode(code, email, phoneNumber);

  return res.json({ message: 'Código válido' });
};
