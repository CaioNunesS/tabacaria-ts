import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as Order from '../findOrderById.service';
import { queryOrderById, selectMock } from '../../../../mocks/order.mock';

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

describe('when get order by id', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should gets an order by id', async () => {
    vi.spyOn(Order, 'findOrderById').mockImplementation(async () => {
      const order = await prismaMock.order.findById({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
        select: selectMock,
      });
      return order;
    });
    prismaMock.order.findById.mockResolvedValue(queryOrderById);
    const result = await Order.findOrderById(
      '598641f1-1b95-45c0-a11a-37958de2b63c'
    );

    expect(result).toEqual(queryOrderById);
    expect(prismaMock.order.findById).toHaveBeenCalledWith({
      where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
      select: selectMock,
    });
  });

  it('should throw an error if no order is found', async () => {
    prismaMock.order.findById.mockRejectedValue(new Error('Order not found'));

    // eslint-disable-next-line prettier/prettier
      await expect(Order.findOrderById('598641f1-1b95-45c0-a11a-37958de2b63c')).rejects.toThrow('Order not found')
  });
});
