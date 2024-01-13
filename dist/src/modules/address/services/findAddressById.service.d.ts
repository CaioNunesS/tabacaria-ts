import { Address } from '@prisma/client';
export declare const findAddressById: <Key extends "number" | "id" | "active" | "createdAt" | "updatedAt" | "userId" | "street" | "city" | "state" | "neighborhood" | "zipCode" | "AdditionalData">(id: string, keys?: Key[]) => Promise<Pick<{
    id: string;
    street: string;
    city: string;
    state: string;
    neighborhood: string;
    number: string;
    zipCode: string;
    AdditionalData: string | null;
    userId: string;
    active: boolean | null;
    createdAt: Date;
    updatedAt: Date;
}, Key>>;
