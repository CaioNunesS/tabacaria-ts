import { Orders } from '@prisma/client';
export declare const findOrderById: (orderId: string) => Promise<Orders | undefined>;
