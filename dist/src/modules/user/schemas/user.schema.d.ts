export declare const userUpdateSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        name: import("zod").ZodOptional<import("zod").ZodString>;
        email: import("zod").ZodOptional<import("zod").ZodString>;
        phoneNumber: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        name?: string | undefined;
        email?: string | undefined;
        phoneNumber?: string | undefined;
    }, {
        name?: string | undefined;
        email?: string | undefined;
        phoneNumber?: string | undefined;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        name?: string | undefined;
        email?: string | undefined;
        phoneNumber?: string | undefined;
    };
}, {
    body: {
        name?: string | undefined;
        email?: string | undefined;
        phoneNumber?: string | undefined;
    };
}>;
