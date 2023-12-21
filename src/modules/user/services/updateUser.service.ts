// Importando tipos do Prisma e do usuário
import { Prisma, User } from '@prisma/client';

// Importando a função throwError do utilitário
import { throwError } from '../../../utils';

// Importando o módulo http-status para códigos de status HTTP
import httpStatus from 'http-status';

// Importando o serviço para encontrar um usuário pelo número de telefone
import { findUserByPhoneNumber } from '../services/findUserByPhoneNumber.service';

// Importando o serviço para encontrar um usuário pelo email
import { findUserByEmail } from './findUserByEmail.service';

// Importando o serviço para encontrar um usuário pelo ID
import { findUserById } from './findUserById.service';

// Importando o objeto de conexão com o banco de dados (Prisma)
import { db } from '../../../config';

// Definindo o tipo de resposta para a função updateUser
type IupdateUserResponse = {
  id?: string;
  active?: boolean;
  name?: string;
  email?: string;
  role?: string;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// Função para atualizar um usuário
export const updateUser = async <Key extends keyof User>(
  userId: string,
  updateBody: Prisma.UserUpdateInput,
  keys: Key[] = [
    'id',
    'name',
    'active',
    'email',
    'phoneNumber',
    'createdAt',
    'updatedAt',
  ] as Key[]
): Promise<IupdateUserResponse | null> => {
  // Extraindo propriedades relevantes do corpo de atualização
  const { password, phoneNumber, email } = updateBody;

  // Verificando se a senha está sendo modificada e lançando um erro se estiver
  if (password) {
    throwError(
      'Não é possível alterar a senha por este meio',
      httpStatus.BAD_REQUEST
    );
  }

  // Verificando se o número de telefone está sendo modificado
  if (phoneNumber) {
    // Verificando se já existe um usuário com o novo número de telefone
    const existPhoneNumber = await findUserByPhoneNumber(String(phoneNumber));

    // Lançando um erro se o número de telefone já estiver cadastrado por outro usuário
    if (existPhoneNumber && existPhoneNumber.id !== userId) {
      throwError(
        'O número de telefone já está cadastrado',
        httpStatus.BAD_REQUEST
      );
    }
  }

  // Verificando se o email está sendo modificado
  if (email) {
    // Verificando se já existe um usuário com o novo email
    const existEmail = await findUserByEmail(String(email));

    // Lançando um erro se o email já estiver cadastrado por outro usuário
    if (existEmail && existEmail.id !== userId) {
      throwError('O email já está cadastrado', httpStatus.BAD_REQUEST);
    }
  }

  // Buscando o usuário antes da atualização
  const user = await findUserById(userId, [
    'id',
    'name',
    'active',
    'email',
    'phoneNumber',
    'role',
    'createdAt',
    'updatedAt',
  ]);

  // Lançando um erro se o usuário não for encontrado
  if (!user) throwError('Usuário não encontrado', httpStatus.NOT_FOUND);

  // Atualizando o usuário no banco de dados usando o Prisma
  const updatedUser = await db.user.update({
    where: { id: userId },
    data: updateBody,
    // Selecionando apenas as colunas especificadas em 'keys'
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });

  // Retornando o usuário atualizado
  return updatedUser as IupdateUserResponse | null;
};
