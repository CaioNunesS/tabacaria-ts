// Importando módulos necessários do Express
import { NextFunction, Request, Response } from 'express';

// Importando a classe CustomError para representar erros personalizados
import { CustomError } from '../utils/';

// Importando a configuração de ambiente
import { env } from '../env';

// Middleware para lidar com erros
export const erroHandler = (
  // Recebe o objeto de erro personalizado (CustomError)
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Variável para armazenar o código de status da resposta
  let statusCode: number;

  // Verificando se o erro é uma instância de CustomError
  if (err instanceof CustomError) {
    // Usando o código de status do erro personalizado
    statusCode = err.statusCode;

    // Removendo a propriedade 'stack' do objeto de erro antes de enviar para produção
    delete err.stack;
  } else {
    // Se não for um erro personalizado, usando o código de status da resposta ou 500 como padrão
    statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  }

  // Configurando o código de status da resposta
  res.status(statusCode);

  // Enviando uma resposta JSON com detalhes do erro
  res.json({
    message: err.message,
    // Exibindo a stack apenas em ambiente de desenvolvimento
    stack: env.NODE_ENV === 'production' ? 'error' : err.stack,
  });

  // Chamando a próxima função middleware
  return next();
};
