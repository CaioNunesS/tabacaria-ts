import { IcreateCoupon } from '../modules/coupons/coupon.service';
import { Coupons } from '@prisma/client';
export declare const createDataMock: IcreateCoupon;
export declare const queryCoupon: {
    id: string;
    title: string;
    description: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
    revoked: boolean;
}[];
export declare const queryCouponById: Coupons;
export declare const queryCouponByTitle: Coupons;
export declare const selectMock: {
    id: boolean;
    title: boolean;
    value: boolean;
    description: boolean;
    createdAt: boolean;
    updatedAt: boolean;
    revoked: boolean;
};
