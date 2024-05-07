// Importando módulos necessários do multer e do Node.js
import multer from 'multer';
import crypto from 'crypto';
import { resolve } from 'path';
import { Request } from 'express';

// Importando configurações de ambiente
import { env } from '../env';
import { AppError } from '../utils/index';

// Configuração de armazenamento em disco para o multer
export const diskStorage = multer.diskStorage({
  // Especificando o diretório de destino para os uploads
  destination: resolve(__dirname, '..', '..', './uploads'),

  // Definindo o nome do arquivo durante o armazenamento
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    // Gerando um nome de arquivo único usando bytes criptografados e informações de data
    crypto.randomBytes(16, function (err, row) {
      if (err) cb(err);

      cb(
        null,
        `${row.toString('hex')}.${Date.now()}.${file.originalname
          .split('.')
          .pop()!
          .trim()}`
      );
    });
  },
});

// Limites de upload, especificando o tamanho máximo do arquivo
export const limits = {
  fileSize: parseInt(env.FILE_UPLOAD_SIZE_IN_BYTE),
};

// Filtro de tipo de arquivo para aceitar apenas imagens PNG, JPG e JPEG
export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: any
) => {
  // Verificando se o tipo de arquivo está entre os permitidos
  if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
    // Lançando um erro personalizado se o tipo de arquivo não for permitido
    return cb(
      new AppError(
        'Apenas arquivos image/jpg, image/jpeg, image/png são permitidos',
        422
      )
    );
  }

  // Chamando o callback com sucesso se o tipo de arquivo for permitido
  cb(null, true);
};
