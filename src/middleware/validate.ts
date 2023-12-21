// Importando módulos necessários do Express e Zod (validação de esquema)
import { NextFunction, Request, Response } from 'express';
import { ZodError, Schema } from 'zod';

// Middleware de validação de dados com base em um esquema Zod
export const validate =
  (schema: Schema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validando os parâmetros, a query e o corpo da requisição usando o esquema fornecido
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      // Se a validação for bem-sucedida, chama o próximo middleware na cadeia
      next();
    } catch (error) {
      // Captura erros lançados durante a validação
      if (error instanceof ZodError) {
        // Se o erro for uma instância de ZodError, retorna uma resposta JSON com detalhes dos erros
        return res.status(400).json({
          status: 'fail',
          errors: error.errors,
        });
      }

      // Se o erro não for do tipo ZodError, repassa o erro para o próximo middleware na cadeia
      next(error);
    }
  };
