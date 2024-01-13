import { Request, Response } from 'express';
export declare const create: (req: Request, res: Response) => Promise<void>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const refreshToken: (req: Request, res: Response) => Promise<void>;
export declare const revokeRefreshToken: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const sendCode: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verificationCodeSended: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const changePassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
