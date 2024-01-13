import { Prisma } from '@prisma/client';
type updateProductResponse = {
    id?: string;
    name: string;
    price: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
};
export declare const updateProduct: <Key extends "id" | "active" | "name" | "createdAt" | "updatedAt" | "price" | "description">(id: string, updateBody: Prisma.ProductsUpdateInput, keys?: Key[]) => Promise<updateProductResponse | null>;
export {};
