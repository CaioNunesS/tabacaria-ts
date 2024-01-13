export declare const findUserByEmail: (email: string) => Promise<{
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
} | null | undefined>;
