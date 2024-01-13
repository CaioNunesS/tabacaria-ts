import multer from 'multer';
import { Request } from 'express';
export declare const diskStorage: multer.StorageEngine;
export declare const limits: {
    fileSize: number;
};
export declare const imageFileFilter: (req: Request, file: Express.Multer.File, cb: any) => any;
