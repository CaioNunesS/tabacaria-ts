export declare class AppError extends Error {
    status: number;
    constructor(message: string, status: number);
}
