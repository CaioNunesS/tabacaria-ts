// Importando configurações do dotenv para carregar variáveis de ambiente
import 'dotenv/config';

// Importando express e middlewares relacionados
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

// Importando middlewares personalizados
import { notFound, erroHandler, logMiddleware } from './middleware/index';

// Importando o módulo passport para autenticação
import passport from 'passport';

// Importando as configurações de ambiente
import { env } from './env';

// Requerindo configurações adicionais para o passport
require('./middleware/passport');

// Importando o módulo session para gerenciar sessões
import session from 'express-session';

// Importando as rotas da aplicação
import routes from './routes';

// Criando uma instância do aplicativo Express
const app = express();

// Configurando middlewares globais
app.use(cors()); // Permite solicitações de diferentes origens
app.use(helmet()); // Aplica configurações de segurança no cabeçalho HTTP
app.use(morgan('dev')); // Middleware de logging para desenvolvimento
app.use(json()); // Parseia solicitações JSON
app.use(urlencoded({ extended: true })); // Parseia solicitações de formulário HTML
app.use(logMiddleware); // Middleware personalizado de logging

// Configurando o middleware de sessão para gerenciar sessões de usuário
app.use(
  session({
    secret: env.SESSION_SECRET, // Chave secreta para assinar as sessões
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 1000, // Tempo de vida máximo da sessão em milissegundos (1 minuto)
    },
  })
);

// Configurando o middleware de autenticação passport
app.use(passport.session()); // Middleware para gerenciar sessões de autenticação
app.use(passport.initialize()); // Inicializa o passport

// Configurando as rotas da aplicação
app.use('/api/v1', routes);

// Middleware para lidar com solicitações não encontradas (404)
app.use(notFound);

// Middleware para lidar com erros durante a execução
app.use(erroHandler);

// Exportando o aplicativo Express configurado
export default app;
