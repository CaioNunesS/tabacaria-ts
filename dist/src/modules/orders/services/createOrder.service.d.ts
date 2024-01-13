export type ICreateOrder = {
    id?: string;
    products: string[];
    couponId?: string | undefined;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
    value?: string;
};
export declare const createOrder: ({ products, couponId, userId, }: ICreateOrder) => Promise<{
    User: {
        name: string;
    } | null;
    coupons: {
        id: string;
        title: string;
        description: string;
        value: string;
        revoked: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null;
    products: {
        Products: {
            id: string;
            active: boolean;
            name: string;
            price: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }[];
} & {
    id: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
    couponsId: string | null;
    isPaid: boolean;
    discount: string | null;
}>;
