import { IChangePassword } from '../auth/auth.service';
export declare const registerSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        name: import("zod").ZodString;
        email: import("zod").ZodString;
        phoneNumber: import("zod").ZodString;
        password: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        name: string;
        email: string;
        password: string;
        phoneNumber: string;
    }, {
        name: string;
        email: string;
        password: string;
        phoneNumber: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        name: string;
        email: string;
        password: string;
        phoneNumber: string;
    };
}, {
    body: {
        name: string;
        email: string;
        password: string;
        phoneNumber: string;
    };
}>;
export declare const registerCompleteSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        email: import("zod").ZodString;
        name: import("zod").ZodString;
        gitHubId: import("zod").ZodString;
        password: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        name: string;
        email: string;
        password: string;
        gitHubId: string;
    }, {
        name: string;
        email: string;
        password: string;
        gitHubId: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        name: string;
        email: string;
        password: string;
        gitHubId: string;
    };
}, {
    body: {
        name: string;
        email: string;
        password: string;
        gitHubId: string;
    };
}>;
export declare const loginSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        email: import("zod").ZodString;
        password: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        email: string;
        password: string;
    }, {
        email: string;
        password: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        email: string;
        password: string;
    };
}, {
    body: {
        email: string;
        password: string;
    };
}>;
export declare const refreshTokenSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        refreshToken: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        refreshToken: string;
    }, {
        refreshToken: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        refreshToken: string;
    };
}, {
    body: {
        refreshToken: string;
    };
}>;
export declare const revokeTokenSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        userId: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        userId: string;
    }, {
        userId: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        userId: string;
    };
}, {
    body: {
        userId: string;
    };
}>;
export declare const validateChangePassword: (body: IChangePassword) => import("zod").SafeParseReturnType<{
    newPassword: string;
    confirmNewPassword: string;
}, {
    newPassword: string;
    confirmNewPassword: string;
}>;
