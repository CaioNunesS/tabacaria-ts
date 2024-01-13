export declare const productSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        name: import("zod").ZodString;
        price: import("zod").ZodString;
        description: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        name: string;
        price: string;
        description: string;
    }, {
        name: string;
        price: string;
        description: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        name: string;
        price: string;
        description: string;
    };
}, {
    body: {
        name: string;
        price: string;
        description: string;
    };
}>;
