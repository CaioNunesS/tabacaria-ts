import { Role } from '@prisma/client';
export type IuserCreate = {
    id?: string;
    active?: boolean;
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    gitHubId?: string;
    googleId?: string;
    role?: Role;
    verificationCode?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
export declare const createUser: (user: IuserCreate) => Promise<{
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
}>;
