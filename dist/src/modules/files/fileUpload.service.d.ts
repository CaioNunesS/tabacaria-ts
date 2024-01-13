type IfileUpload = {
    file: string;
    productId: string;
    filename: string;
};
export declare const fileUploadPhoto: ({ file, productId, filename, }: IfileUpload) => Promise<{
    id: string;
    active: boolean;
    name: string;
    price: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
} | undefined>;
export declare const deleteFile: (imageName: string) => Promise<void>;
export {};
