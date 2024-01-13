export declare const productUpdateSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        name: import("zod").ZodOptional<import("zod").ZodString>;
        price: import("zod").ZodOptional<import("zod").ZodString>;
        description: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        name?: string | undefined;
        price?: string | undefined;
        description?: string | undefined;
    }, {
        name?: string | undefined;
        price?: string | undefined;
        description?: string | undefined;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        name?: string | undefined;
        price?: string | undefined;
        description?: string | undefined;
    };
}, {
    body: {
        name?: string | undefined;
        price?: string | undefined;
        description?: string | undefined;
    };
}>;
