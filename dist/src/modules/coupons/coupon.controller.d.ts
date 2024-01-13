import { Request, Response } from 'express';
export declare const create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findAll: (req: Request, res: Response) => Promise<void>;
export declare const findById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
