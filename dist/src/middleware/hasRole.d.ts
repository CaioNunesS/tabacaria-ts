import { NextFunction, Request, Response } from 'express';
export declare const hasRole: (roles: string[]) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
