export declare const smsSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        phone: import("zod").ZodString;
        name: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        phone: string;
        name: string;
    }, {
        phone: string;
        name: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        phone: string;
        name: string;
    };
}, {
    body: {
        phone: string;
        name: string;
    };
}>;
