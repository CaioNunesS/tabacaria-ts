// Importando módulos necessários
import httpStatus from 'http-status';
import { throwError } from '../../../utils';
import { findUserByPhoneNumber } from '../services/findUserByPhoneNumber.service';
import { hashSync } from 'bcrypt';
import { db } from '../../../config';
import { Role } from '@prisma/client';

// Definindo o tipo para os dados de criação de usuário
export type IuserCreate = {
  id?: string;
  active?: boolean;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  gitHubId?: string;
  googleId?: string;
  role?: Role;
  verificationCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// Função para criar um novo usuário
export const createUser = async (user: IuserCreate) => {
  const { phoneNumber } = user;

  const existPhoneNumber = await findUserByPhoneNumber(phoneNumber);

  if (existPhoneNumber) {
    throwError('Número de telefone já cadastrado', httpStatus.BAD_REQUEST);
  }
  user.password = hashSync(user.password, 12);

  return await db.user.create({
    data: user,
  });
};
