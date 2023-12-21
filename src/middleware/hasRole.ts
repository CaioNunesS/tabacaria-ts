// Importando módulos necessários do Express
import { NextFunction, Request, Response } from 'express';

// Importando o serviço responsável por encontrar um usuário pelo ID
import { findUserById } from '../modules/user/services';

// Função middleware para verificar se o usuário tem as roles necessárias
export const hasRole =
  (roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extraindo o ID do usuário do payload da requisição
      const { userId } = req.payload;

      // Buscando o usuário pelo ID usando o serviço findUserById
      const user = await findUserById(userId);

      // Verificando se o usuário existe e se tem uma das roles permitidas
      if (user && !roles.includes(user.role))
        // Retornando uma resposta de status 401 (Unauthorized) se as roles não correspondem
        return res.status(401).json({ message: 'Unauthorized' });

      // Se as roles correspondem, chamando a próxima função middleware
      return next();
    } catch (error: any) {
      // Capturando e relançando qualquer erro ocorrido durante o processamento
      throw new Error(error);
    }
  };
