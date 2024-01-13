import { Request, Response, NextFunction } from 'express';
export declare const asyncWrapper: (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => Promise<any>;
