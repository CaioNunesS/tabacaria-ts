import { db } from '../../../config';

export const findAllOrders = async (
  filter: {
    id?: string;
    value?: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
    revoked?: boolean;
  },
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  }
) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';

  const result = await db.orders.findMany({
    where: filter,
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
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });

  return result;
};
