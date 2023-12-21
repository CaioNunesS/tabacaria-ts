// Importando a biblioteca jwt para gerar tokens JWT (JSON Web Tokens)
import jwt from 'jsonwebtoken';

// Importando o modelo de usuário (User) do Prisma
import { User } from '@prisma/client';

// Importando as configurações de ambiente (env)
import { env } from '../env';

// Obtendo a chave secreta do token de acesso do ambiente
const accessTokenSecret = env.JWT_ACCESS_SECRET;

// Função para gerar um token de acesso (JWT) para um usuário
export const generateAccessToken = (user: User) => {
  // Verificando se a chave secreta do token de acesso está definida no ambiente
  if (accessTokenSecret) {
    // Gerando um token de acesso com o ID do usuário, usando a chave secreta e configurando a expiração para 1 dia
    return jwt.sign({ userId: user.id }, accessTokenSecret, {
      expiresIn: '1d',
    });
  }
};

// Função para gerar um token de atualização (refresh token) para um usuário
export const generateRefreshToken = (user: User, jwtId: string) => {
  // Verificando se a chave secreta do token de atualização está definida no ambiente
  if (env.JWT_REFRESH_SECRET) {
    // Gerando um token de atualização com o ID do usuário, o ID do token JWT e configurando a expiração para 4 horas
    return jwt.sign({ userId: user.id, jwtId }, env.JWT_REFRESH_SECRET, {
      expiresIn: '4h',
    });
  }
};

// Função para gerar ambos os tokens (de acesso e de atualização) para um usuário
export const generateTokens = (user: User, jwtId: string) => {
  // Gerando um token de acesso
  const accessToken = generateAccessToken(user);

  // Gerando um token de atualização
  const refreshToken = generateRefreshToken(user, jwtId);

  // Retornando ambos os tokens gerados
  return {
    accessToken,
    refreshToken,
  };
};
