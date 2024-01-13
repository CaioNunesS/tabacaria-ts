export declare const orderSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        products: import("zod").ZodArray<import("zod").ZodString, "atleastone">;
    }, "strip", import("zod").ZodTypeAny, {
        products: [string, ...string[]];
    }, {
        products: [string, ...string[]];
    }>;
    couponId: import("zod").ZodOptional<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        products: [string, ...string[]];
    };
    couponId?: string | undefined;
}, {
    body: {
        products: [string, ...string[]];
    };
    couponId?: string | undefined;
}>;
