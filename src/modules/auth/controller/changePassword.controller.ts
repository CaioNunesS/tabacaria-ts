import { Request, Response } from 'express';
import { changePasswordServ } from '../service';

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
