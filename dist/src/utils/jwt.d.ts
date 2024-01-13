import { User } from '@prisma/client';
export declare const generateAccessToken: (user: User) => string | undefined;
export declare const generateRefreshToken: (user: User, jwtId: string) => string | undefined;
export declare const generateTokens: (user: User, jwtId: string) => {
    accessToken: string | undefined;
    refreshToken: string | undefined;
};
