import { Products } from '@prisma/client';
export declare const findProductByName: <Key extends "id" | "active" | "name" | "createdAt" | "updatedAt" | "price" | "description">(name: string, keys?: Key[]) => Promise<Pick<{
    id: string;
    active: boolean;
    name: string;
    price: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}, Key> | undefined>;
