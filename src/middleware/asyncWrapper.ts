// Importando módulos necessários do Express
import { Request, Response, NextFunction } from 'express';

// Função de envoltório assíncrono para lidar com erros em funções assíncronas
export const asyncWrapper =
  // Aceita uma função assíncrona (fn) como parâmetro


    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    // Retorna outra função middleware
    (req: Request, res: Response, next: NextFunction) =>
      // Resolve a função assíncrona e trata qualquer erro lançando-o para o próximo middleware
      Promise.resolve(fn(req, res, next)).catch(next);
