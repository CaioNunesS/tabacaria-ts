import { User } from '@prisma/client';
export declare const findUserById: <Key extends "id" | "active" | "name" | "email" | "password" | "gitHubId" | "googleId" | "verificationCode" | "phoneNumber" | "role" | "createdAt" | "updatedAt">(id: string, keys?: Key[]) => Promise<Pick<{
    id: string;
    active: boolean;
    name: string;
    email: string;
    password: string | null;
    gitHubId: string | null;
    googleId: string | null;
    verificationCode: string | null;
    phoneNumber: string | null;
    role: import(".prisma/client").$Enums.Role;
    createdAt: Date;
    updatedAt: Date;
}, Key> | undefined>;
