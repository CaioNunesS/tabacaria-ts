export declare const findUserByPhoneNumber: (phoneNumber: string) => Promise<{
    id: string;
    active: boolean;
    name: string;
    email: string;
    gitHubId: string | null;
    googleId: string | null;
    verificationCode: string | null;
    phoneNumber: string | null;
    role: import(".prisma/client").$Enums.Role;
    createdAt: Date;
    updatedAt: Date;
} | null | undefined>;
