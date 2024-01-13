import { Products } from '@prisma/client';
export declare const findAllProducts: <Key extends "id" | "active" | "name" | "createdAt" | "updatedAt" | "price" | "description">(filter: {
    id?: string;
    active?: boolean;
    name?: string;
    price?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}, options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
}, keys?: Key[]) => Promise<Pick<{
    id: string;
    active: boolean;
    name: string;
    price: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}, Key>[]>;
