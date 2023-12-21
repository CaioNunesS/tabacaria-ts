// Importando módulos necessários do Express
import { NextFunction, Request, Response } from 'express';

// Middleware para tratar requisições para rotas não encontradas (404)
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  // Configurando o código de status da resposta para 404 (Not Found)
  res.status(404);

  // Criando um objeto de erro com uma mensagem indicando a URL original não encontrada
  const error = new Error(`not found - ${req.originalUrl}`);

  // Passando o erro para o próximo middleware na cadeia
  next(error);
};
