export declare class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare const throwError: (message: string, statusCode: number) => never;
