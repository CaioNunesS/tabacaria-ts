import { NextFunction, Request, Response } from 'express';
import { Schema } from 'zod';
export declare const validate: (schema: Schema<any>) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
