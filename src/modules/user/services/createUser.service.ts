// Importando módulos necessários
import httpStatus from 'http-status';
import { throwError } from '../../../utils';

// Importando o serviço para encontrar usuários por número de telefone
import { findUserByPhoneNumber } from '../services/findUserByPhoneNumber.service';

// Importando o método hashSync do bcrypt para hashear senhas
import { hashSync } from 'bcrypt';

// Importando o objeto de conexão com o banco de dados (Prisma)
import { db } from '../../../config';

// Importando o tipo de role do Prisma
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
  // Extraindo o número de telefone do usuário
  const { phoneNumber } = user;

  // Verificando se já existe um usuário com o mesmo número de telefone
  const existPhoneNumber = await findUserByPhoneNumber(phoneNumber);

  // Se já existir, lançar um erro informando que o número de telefone já está cadastrado
  if (existPhoneNumber) {
    throwError('Número de telefone já cadastrado', httpStatus.BAD_REQUEST);
  }

  // Hasheando a senha antes de salvar no banco de dados
  user.password = hashSync(user.password, 12);

  // Criando o usuário no banco de dados usando o Prisma
  return await db.user.create({
    data: user,
  });
};
