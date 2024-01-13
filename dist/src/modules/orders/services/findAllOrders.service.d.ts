export declare const findAllOrders: (filter: {
    id?: string;
    value?: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
    revoked?: boolean;
}, options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
}) => Promise<({
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
    products: ({
        Products: {
            name: string;
            price: string;
        };
    } & {
        productsId: string;
        ordersId: string;
        createdAt: Date;
        updatedAt: Date;
    })[];
} & {
    id: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
    couponsId: string | null;
    isPaid: boolean;
    discount: string | null;
})[]>;
