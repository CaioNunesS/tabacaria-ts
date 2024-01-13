import { ITwilio } from '../../../config/index';
export declare const sendSms: ({ message, phone }: ITwilio) => Promise<{
    status: import("twilio/lib/rest/api/v2010/account/message").MessageStatus;
    id: string;
} | undefined>;
