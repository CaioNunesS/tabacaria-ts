import { Products } from '@prisma/client';
export declare const findProductByImageName: <Key extends "id" | "active" | "name" | "createdAt" | "updatedAt" | "price" | "description">(imageName: string, keys?: Key[]) => Promise<Pick<{
    id: string;
    active: boolean;
    name: string;
    price: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}, Key> | undefined>;
