type IAddRefreshTokenToWriteList = {
    jwtId: string;
    refreshToken: string;
    userId: string;
};
export type IRegister = {
    id?: string;
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    gitHubId?: string;
    googleId?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
export interface IChangePassword {
    newPassword: string;
    confirmNewPassword: string;
}
type IRefreshToken = {
    refreshToken: string;
};
export declare const register: ({ email, password, name, phoneNumber, gitHubId, googleId, }: IRegister) => Promise<{
    accessToken: string | undefined;
    refreshToken: string;
} | undefined>;
export declare const addRefreshTokenToWriteList: ({ jwtId, refreshToken, userId, }: IAddRefreshTokenToWriteList) => import(".prisma/client").Prisma.Prisma__RefreshTokenClient<{
    id: string;
    hashedToken: string;
    userId: string;
    revoked: boolean;
    createdAt: Date;
    updatedAt: Date;
}, never, import("@prisma/client/runtime/library").DefaultArgs> | undefined;
export declare const findRefreshTokenById: (id: string) => import(".prisma/client").Prisma.Prisma__RefreshTokenClient<{
    id: string;
    hashedToken: string;
    userId: string;
    revoked: boolean;
    createdAt: Date;
    updatedAt: Date;
} | null, null, import("@prisma/client/runtime/library").DefaultArgs> | undefined;
export declare const deleteRefreshToken: (id: string) => import(".prisma/client").Prisma.Prisma__RefreshTokenClient<{
    id: string;
    hashedToken: string;
    userId: string;
    revoked: boolean;
    createdAt: Date;
    updatedAt: Date;
}, never, import("@prisma/client/runtime/library").DefaultArgs> | undefined;
export declare const revokeTokens: (userId: string) => import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
export declare const authenticatedUserByEmailAndPassword: (email: string, password: string) => Promise<{
    accessToken: string | undefined;
    refreshToken: string;
} | undefined>;
export declare const refreshToken: ({ refreshToken }: IRefreshToken) => Promise<{
    accessToken: string | undefined;
    refreshToken: string;
} | undefined>;
export declare const sendVerificationCode: (email?: string, phone?: string) => Promise<void>;
export declare const verifyCode: (code: string, email?: string, phoneNumber?: string) => Promise<"okay" | undefined>;
export declare const changePasswordServ: (id: string, changedPassword: IChangePassword) => Promise<{
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
