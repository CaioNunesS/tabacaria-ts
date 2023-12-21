// Importando módulos necessários do morgan, fs e path
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

// Importando o tipo Request do Express
import { Request } from 'express';

// Criando um fluxo de escrita para o arquivo de log de acesso
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '..', 'logs', 'access.log'),
  { flags: 'a' }
);

// Definindo um novo token para morgan que loga o corpo da requisição para POST e PUT
morgan.token('req-body', (req: Request) => {
  return req.method === 'POST' || req.method === 'PUT'
    ? JSON.stringify(req.body)
    : '';
});

// Definindo um formato personalizado para o log
const customFormatLog =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :req-body';

// Middleware de log usando o morgan
export const logMiddleware = morgan(customFormatLog, {
  // Especificando o fluxo de escrita para o arquivo de log de acesso
  stream: accessLogStream,
});
