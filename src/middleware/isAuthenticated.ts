// Importando módulos necessários do Express e do jsonwebtoken
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Importando função de lançamento de erro personalizado
import { throwError } from '../utils/index';

// Importando configurações de ambiente
import { env } from '../env';

// Middleware para verificar se o usuário está autenticado
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Obtendo o cabeçalho de autorização da requisição
  const authorization = req.headers.authorization;

  // Verificando se o cabeçalho de autorização está presente
  if (!authorization) {
    // Configurando o código de status para 401 (Unauthorized) e lançando um erro
    res.status(401);
    throwError('Não autorizado', 401);
  }

  try {
    // Se o cabeçalho de autorização estiver presente
    if (authorization) {
      // Separando o prefixo 'Bearer' e o token do cabeçalho
      const [bearer, token] = authorization.split(' ');

      // Verificando se o prefixo é 'Bearer'
      if (bearer !== 'Bearer') {
        // Configurando o código de status para 401 (Unauthorized) e enviando uma mensagem
        res.status(401).json('Token inválido');
      }

      // Verificando e decodificando o token usando a chave secreta de acesso JWT
      const payload = jwt.verify(
        token,
        env.JWT_ACCESS_SECRET
      ) as jwt.JwtPayload;

      // Adicionando o payload decodificado ao objeto de requisição (req)
      req.payload = payload;
    }
  } catch (error: any) {
    // Lidando com erros durante a verificação do token
    res.status(401);

    // Verificando se o erro é devido à expiração do token
    if (error.name === 'TokenExpiredError') {
      // Configurando o código de status para 401 (Unauthorized) e lançando um erro
      throwError('Não autorizado', 401);
    }
  }

  return next();
};
