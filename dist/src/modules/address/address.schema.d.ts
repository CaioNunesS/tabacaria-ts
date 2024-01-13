export declare const addressSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        street: import("zod").ZodString;
        number: import("zod").ZodString;
        city: import("zod").ZodString;
        state: import("zod").ZodString;
        neighborhood: import("zod").ZodString;
        zipCode: import("zod").ZodString;
        AdditionalData: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
        userId: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        number: string;
        userId: string;
        street: string;
        city: string;
        state: string;
        neighborhood: string;
        zipCode: string;
        AdditionalData?: string | null | undefined;
    }, {
        number: string;
        userId: string;
        street: string;
        city: string;
        state: string;
        neighborhood: string;
        zipCode: string;
        AdditionalData?: string | null | undefined;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        number: string;
        userId: string;
        street: string;
        city: string;
        state: string;
        neighborhood: string;
        zipCode: string;
        AdditionalData?: string | null | undefined;
    };
}, {
    body: {
        number: string;
        userId: string;
        street: string;
        city: string;
        state: string;
        neighborhood: string;
        zipCode: string;
        AdditionalData?: string | null | undefined;
    };
}>;
export declare const addressUpdateSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        street: import("zod").ZodOptional<import("zod").ZodString>;
        number: import("zod").ZodOptional<import("zod").ZodString>;
        city: import("zod").ZodOptional<import("zod").ZodString>;
        state: import("zod").ZodOptional<import("zod").ZodString>;
        neighborhood: import("zod").ZodOptional<import("zod").ZodString>;
        zipCode: import("zod").ZodOptional<import("zod").ZodString>;
        AdditionalData: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
        userId: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        userId: string;
        street?: string | undefined;
        number?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        neighborhood?: string | undefined;
        zipCode?: string | undefined;
        AdditionalData?: string | null | undefined;
    }, {
        userId: string;
        street?: string | undefined;
        number?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        neighborhood?: string | undefined;
        zipCode?: string | undefined;
        AdditionalData?: string | null | undefined;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        userId: string;
        street?: string | undefined;
        number?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        neighborhood?: string | undefined;
        zipCode?: string | undefined;
        AdditionalData?: string | null | undefined;
    };
}, {
    body: {
        userId: string;
        street?: string | undefined;
        number?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        neighborhood?: string | undefined;
        zipCode?: string | undefined;
        AdditionalData?: string | null | undefined;
    };
}>;
