// Importando a função findUserByEmail do serviço de usuário
import { findUserByEmail } from '../modules/user/services';

// Importando a função throwError do módulo index
import { throwError } from './index';

// Importando a função compare do bcrypt para comparar senhas
import { compare } from 'bcrypt';

// Função para comparar a senha fornecida com a senha armazenada para um usuário específico
export const comparePassword = async (email: string, password: string) => {
  try {
    // Buscando o usuário pelo e-mail
    const existUser = await findUserByEmail(email);

    // Verificando se o usuário existe
    if (!existUser) {
      // Lançando um erro personalizado se o usuário não for encontrado
      throwError('Usuário não encontrado', 404);
      return null; // Retornando null em caso de erro
    }

    // Verificando se o usuário possui uma senha armazenada
    if (existUser.password !== null) {
      // Comparando a senha fornecida com a senha armazenada usando o bcrypt
      const isPasswordMatch = await compare(password, existUser.password);

      // Lançando um erro se as senhas não coincidirem
      if (!isPasswordMatch) {
        throwError('Senha ou e-mail incorreto', 404);
      }
    }

    // Retornando o usuário se tudo estiver correto
    return existUser;
  } catch (error) {
    // Lançando um erro personalizado em caso de falha
    throwError('Usuário não encontrado', 404);
  }
};
