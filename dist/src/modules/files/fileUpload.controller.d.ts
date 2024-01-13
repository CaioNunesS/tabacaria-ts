import { Request, Response } from 'express';
export declare const fileUpload: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const excludeProductImage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const viewImage: (req: Request, res: Response) => Promise<void>;
