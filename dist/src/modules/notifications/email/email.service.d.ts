import 'dotenv/config';
export type ISendMail = {
    to: string;
    subject: string;
    html: string;
};
export declare const sendMail: ({ to, subject, html }: ISendMail) => Promise<{
    message: string;
    preview: string | false;
}>;
