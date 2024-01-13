export declare const couponSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        title: import("zod").ZodString;
        description: import("zod").ZodString;
        value: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        value: string;
        description: string;
        title: string;
    }, {
        value: string;
        description: string;
        title: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        value: string;
        description: string;
        title: string;
    };
}, {
    body: {
        value: string;
        description: string;
        title: string;
    };
}>;
