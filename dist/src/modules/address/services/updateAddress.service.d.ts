import { Prisma } from '@prisma/client';
export interface IUpdateAddress {
    street?: string;
    city?: string;
    neighborhood?: string;
    state?: string;
    number?: string;
    zipCode?: string;
    userId?: string;
    AdditionalData?: string;
}
export declare const updateAddress: <Key extends "number" | "id" | "active" | "createdAt" | "updatedAt" | "userId" | "street" | "city" | "state" | "neighborhood" | "zipCode" | "AdditionalData">(id: string, updateBody: Prisma.AddressUpdateInput, keys?: Key[]) => Promise<IUpdateAddress | null>;
