import { Request, Response } from 'express';
import path from 'path';

export const getAll = async (req: Request, res: Response) => {
  const logFilePath = path.join(__dirname, '..', 'logs', 'access.log');
  res.sendFile(logFilePath);
};
