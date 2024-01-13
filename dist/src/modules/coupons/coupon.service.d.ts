import { Coupons } from '@prisma/client';
export type IcreateCoupon = {
    id?: string;
    title: string;
    description: string;
    value: string;
    createdAt?: Date;
    updatedAt?: Date;
    revoked?: boolean;
};
export declare const createCoupon: ({ title, description, value, }: IcreateCoupon) => Promise<{
    id: string;
    title: string;
    description: string;
    value: string;
    revoked: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const findCouponByTitle: <Key extends "value" | "id" | "createdAt" | "updatedAt" | "revoked" | "description" | "title">(title: string, keys?: Key[]) => Promise<Pick<{
    id: string;
    title: string;
    description: string;
    value: string;
    revoked: boolean;
    createdAt: Date;
    updatedAt: Date;
}, Key> | undefined>;
export declare const findAllCoupons: <Key extends "value" | "id" | "createdAt" | "updatedAt" | "revoked" | "description" | "title">(filter: {
    id?: string;
    title?: string;
    description?: string;
    value?: string;
    createdAt?: Date;
    updatedAt?: Date;
    revoked?: boolean;
}, options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
}, keys?: Key[]) => Promise<Pick<{
    id: string;
    title: string;
    description: string;
    value: string;
    revoked: boolean;
    createdAt: Date;
    updatedAt: Date;
}, Key>[]>;
export declare const findCouponById: <Key extends "value" | "id" | "createdAt" | "updatedAt" | "revoked" | "description" | "title">(couponId: string | undefined, keys?: Key[]) => Promise<Pick<{
    id: string;
    title: string;
    description: string;
    value: string;
    revoked: boolean;
    createdAt: Date;
    updatedAt: Date;
}, Key> | undefined>;
export declare const revokeCoupon: (id: string) => Promise<Coupons | undefined | null>;
export declare const verifyUserCoupon: (userId: string, couponsId: string) => Promise<void>;
