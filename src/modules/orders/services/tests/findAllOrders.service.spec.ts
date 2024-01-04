import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as Order from '../findAllOrders.service';
import { queryOrder, selectMock } from '../../../../mocks/order.mock';

export const prismaMock = {
  order: {
    create: vi.fn(),
    findMany: vi.fn(),
    findById: vi.fn(),
  },
  product: {
    findById: vi.fn(),
  },
};

describe('when query an order', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shoul querys orders with default options', async () => {
    vi.spyOn(Order, 'findAllOrders').mockImplementation(async () => {
      const order = await prismaMock.order.findMany({
        where: { revoked: false },
        select: selectMock,
        skip: 0,
        take: 10,
        orderBy: undefined,
      });

      return order;
    });
    const filter = { revoked: false };
    prismaMock.order.findMany.mockResolvedValue(queryOrder);

    const result = await Order.findAllOrders(filter, {});

    expect(result).toEqual(queryOrder);
    expect(prismaMock.order.findMany).toHaveBeenCalledWith({
      where: filter,
      select: selectMock,
      skip: 0,
      take: 10,
      orderBy: undefined,
    });
  });

  it('should return an empty array if no order is found', async () => {
    const filter = { revoked: false };
    prismaMock.order.findMany.mockResolvedValue([]);

    const result = await Order.findAllOrders(filter, {});
    expect(result).toEqual([]);
  });

  it('should correctly apply the limit and page options', async () => {
    const filter = { revoked: true };
    const options = { limit: 5, page: 2 };

    vi.spyOn(Order, 'findAllOrders').mockImplementation(async () => {
      const order = await prismaMock.order.findMany({
        where: { revoked: true },
        select: selectMock,
        skip: 5,
        take: options.limit,
        orderBy: undefined,
      });

      return order;
    });
    prismaMock.order.findMany.mockResolvedValue([]);

    await Order.findAllOrders(filter, options);
    expect(prismaMock.order.findMany).toHaveBeenCalledWith({
      where: filter,
      select: selectMock,
      skip: 5,
      take: options.limit,
      orderBy: undefined,
    });
  });
});
