export declare const deleteAddress: (id: string) => Promise<{
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
