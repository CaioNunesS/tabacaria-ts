type IregisterWithGoogle = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    provider?: string;
};
export declare const registerWithGoogle: ({ id, firstName, lastName, email, }: IregisterWithGoogle) => Promise<{
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
} | {
    id?: string | undefined;
    active?: boolean | undefined;
    name?: string | undefined;
    email?: string | undefined;
    role?: string | undefined;
    phoneNumber?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
} | null>;
export {};
