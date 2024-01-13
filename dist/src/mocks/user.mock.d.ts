import { IuserCreate } from '../modules/user/services';
import { User } from '@prisma/client';
export declare const createDataMock: IuserCreate;
export declare const queryUserMock: {
    id: string;
    email: string;
    active: boolean;
    phoneNumber: string;
    name: string;
    password: string;
    gitHubId: string;
    googleId: string;
    verificationCode: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}[];
export declare const queryUserById: User;
export declare const selectMock: {
    id: boolean;
    email: boolean;
    active: boolean;
    name: boolean;
    phoneNumber: boolean;
};
