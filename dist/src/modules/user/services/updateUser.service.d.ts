import { Prisma } from '@prisma/client';
type IupdateUserResponse = {
    id?: string;
    active?: boolean;
    name?: string;
    email?: string;
    role?: string;
    phoneNumber?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
export declare const updateUser: <Key extends "id" | "active" | "name" | "email" | "password" | "gitHubId" | "googleId" | "verificationCode" | "phoneNumber" | "role" | "createdAt" | "updatedAt">(userId: string, updateBody: Prisma.UserUpdateInput, keys?: Key[]) => Promise<IupdateUserResponse | null>;
export {};
