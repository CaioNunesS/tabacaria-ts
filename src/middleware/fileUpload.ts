import multer from 'multer';
import crypto from 'crypto';
import { resolve } from 'path';
import { Request } from 'express';

import { env } from '../env';

import { AppError } from '../utils/index';

export const diskStorage = multer.diskStorage({
  destination: resolve(__dirname, '..', '..', './uploads'),
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
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

export const limits = {
  fileSize: parseInt(env.FILE_UPLOAD_SIZE_IN_BYTE),
};

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: any
) => {
  if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
    return cb(
      new AppError(
        'Apenas arquivos image/jpg, image/jpeg, image/png são permitidos',
        422
      )
    );
  }
  cb(null, true);
};
