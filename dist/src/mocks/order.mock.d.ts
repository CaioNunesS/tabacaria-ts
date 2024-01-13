import { ICreateOrder } from '../modules/orders/services/createOrder.service';
import { Orders } from '@prisma/client';
export declare const createDataMock: ICreateOrder;
export declare const createDataMockWithoutCoupon: ICreateOrder;
export declare const queryOrder: {
    id: string;
    value: string;
    products: string[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}[];
export declare const queryOrderById: Orders;
export declare const selectMock: {
    id: boolean;
    value: boolean;
    createdAt: boolean;
    updatedAt: boolean;
    userId: boolean;
    couponsId: boolean;
    isPaid: boolean;
    discount: boolean;
};
