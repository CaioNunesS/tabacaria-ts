import { Products } from '@prisma/client';
import { IcreateProduct } from '../modules/products/services';
export declare const createDataMock: IcreateProduct;
export declare const queryProduct: {
    id: string;
    active: boolean;
    name: string;
    price: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}[];
export declare const queryProductById: Products;
export declare const products: {
    id: string;
    active: boolean;
    name: string;
    price: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}[];
export declare const selectMock: {
    id: boolean;
    name: boolean;
    description: boolean;
    active: boolean;
    price: boolean;
    createdAt: boolean;
    updatedAt: boolean;
};
