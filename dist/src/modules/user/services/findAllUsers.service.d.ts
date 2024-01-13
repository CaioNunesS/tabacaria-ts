import { User } from '@prisma/client';
export declare const findAllUsers: <Key extends "id" | "active" | "name" | "email" | "password" | "gitHubId" | "googleId" | "verificationCode" | "phoneNumber" | "role" | "createdAt" | "updatedAt">(filter: {
    id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    active?: boolean;
}, options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
}, keys?: Key[]) => Promise<Pick<{
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
}, Key>[]>;
