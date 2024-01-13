import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/';
export declare const erroHandler: (err: CustomError, req: Request, res: Response, next: NextFunction) => void;
