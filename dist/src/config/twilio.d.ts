export type ITwilio = {
    phone: string;
    message: string;
};
export declare const twilioConfig: ({ phone, message }: ITwilio) => Promise<{
    status: import("twilio/lib/rest/api/v2010/account/message").MessageStatus;
    id: string;
} | undefined>;
