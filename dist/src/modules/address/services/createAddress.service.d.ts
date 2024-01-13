export interface ICreateAddress {
    id?: string;
    street: string;
    city: string;
    state: string;
    neighborhood: string;
    number: string;
    zipCode: string;
    userId: string;
    AdditionalData?: string | null;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const createAddress: ({ street, city, neighborhood, number, state, zipCode, AdditionalData, userId, }: ICreateAddress) => Promise<{
    id: string;
    street: string;
    city: string;
    state: string;
    neighborhood: string;
    number: string;
    zipCode: string;
    AdditionalData: string | null;
    userId: string;
    active: boolean | null;
    createdAt: Date;
    updatedAt: Date;
}>;
