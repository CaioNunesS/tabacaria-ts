export declare const sendMailSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        name: import("zod").ZodString;
        to: import("zod").ZodString;
        subject: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        name: string;
        to: string;
        subject: string;
    }, {
        name: string;
        to: string;
        subject: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        name: string;
        to: string;
        subject: string;
    };
}, {
    body: {
        name: string;
        to: string;
        subject: string;
    };
}>;
