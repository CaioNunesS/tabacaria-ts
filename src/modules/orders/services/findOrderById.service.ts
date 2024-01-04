import { Orders } from '@prisma/client';
import { db } from '../../../config';
import { throwError } from '../../../utils';

export const findOrderById = async (
  orderId: string
): Promise<Orders | undefined> => {
  const getOrder = await db.orders.findUnique({
    where: { id: orderId },
    // select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    include: {
      products: {
        include: {
          Products: { select: { name: true, price: true } },
        },
      },
      coupons: true,
      User: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!getOrder) throwError('Pedido não encontrado', 404);

  return getOrder as Orders;
};
