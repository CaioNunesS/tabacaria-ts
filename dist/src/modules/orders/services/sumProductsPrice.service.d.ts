type IsumProductsPrice = {
    products: string[];
    valueDiscount: number;
};
export declare const sumProductsPrice: ({ products, valueDiscount, }: IsumProductsPrice) => Promise<string>;
export {};
