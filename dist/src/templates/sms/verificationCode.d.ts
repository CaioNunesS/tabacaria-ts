type IVerificationCode = {
    name: string;
    code: string;
};
export declare const verificationCodeSms: ({ name, code, }: IVerificationCode) => Promise<string>;
export {};
