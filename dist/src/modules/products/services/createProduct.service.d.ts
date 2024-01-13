export type IcreateProduct = {
    id?: string;
    active?: boolean;
    name: string;
    price: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
};
export declare const createProduct: ({ name, price, description, }: IcreateProduct) => Promise<{
    id: string;
    active: boolean;
    name: string;
    price: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}>;
