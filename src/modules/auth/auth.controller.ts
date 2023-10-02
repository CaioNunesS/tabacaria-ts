import { Request, Response } from 'express';
import {
  register,
  authenticatedUserByEmailAndPassword,
  refreshToken as refreshTokenService,
  revokeTokens,
  sendVerificationCode,
  verifyCode,
  changePasswordServ,
} from './auth.service';

export const create = async (req: Request, res: Response) => {
  const { email, password, name, gitHubId, phoneNumber } = req.body;
  const result = await register({
    email,
    password,
    name,
    gitHubId,
    phoneNumber,
  });

  res.json(result);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authenticatedUserByEmailAndPassword(email, password);

  return res.json(result);
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const result = await refreshTokenService({ refreshToken });
  res.json(result);
};

export const revokeRefreshToken = async (req: Request, res: Response) => {
  const { userId } = req.body;

  await revokeTokens(userId);

  return res.json({
    message: `Token revogado para o usuário com o id #${userId}`,
  });
};

export const sendCode = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;
  await sendVerificationCode(email, phoneNumber);

  return res.json({
    message: 'Código de verificação enviado com sucesso',
  });
};

export const verificationCodeSended = async (req: Request, res: Response) => {
  const { code, email, phoneNumber } = req.body;

  await verifyCode(code, email, phoneNumber);

  return res.json({ message: 'Código válido' });
};

export const changePassword = async (req: Request, res: Response) => {
  const { newPassword, confirmNewPassword } = req.body;
  const body = {
    newPassword,
    confirmNewPassword,
  };
  const { id } = req.params;

  await changePasswordServ(id, body);

  return res.json({ message: 'Senha alterada com sucesso' });
};
