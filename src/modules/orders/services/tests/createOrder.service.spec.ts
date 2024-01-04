import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as Order from '../createOrder.service';
import {
  createDataMock,
  createDataMockWithoutCoupon,
} from '../../../../mocks/order.mock';

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

describe('when creating order', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the order with the correct properties', async () => {
    vi.spyOn(Order, 'createOrder').mockImplementation(async () => {
      const user = await prismaMock.order.create({ data: createDataMock });
      return user;
    });
    prismaMock.order.create.mockResolvedValue(createDataMock);
    const result = await Order.createOrder(createDataMock);

    expect(prismaMock.order.create).toHaveBeenCalledWith({
      data: createDataMock,
    });
    expect(result).toHaveProperty('products');
    expect(result).toHaveProperty('userId');
    expect(result).toHaveProperty('couponId');
    expect(result).toEqual(createDataMock);
  });

  it('should return an error if create request fails', async () => {
    prismaMock.order.create.mockRejectedValue(new Error('create order failed'));

    await expect(Order.createOrder(createDataMock)).rejects.toThrow(
      'create order failed'
    );
  });
});

describe('when creating order without coupon', () => {
  it('should return the order with the correct properties', async () => {
    vi.spyOn(Order, 'createOrder').mockImplementation(async () => {
      const user = await prismaMock.order.create({
        data: createDataMockWithoutCoupon,
      });
      return user;
    });
    prismaMock.order.create.mockResolvedValue(createDataMockWithoutCoupon);
    const result = await Order.createOrder(createDataMockWithoutCoupon);

    expect(prismaMock.order.create).toHaveBeenCalledWith({
      data: createDataMockWithoutCoupon,
    });
    expect(result).toHaveProperty('products');
    expect(result).toHaveProperty('userId');
    expect(result).toEqual(createDataMockWithoutCoupon);
  });

  it('should return an error if create request fails', async () => {
    prismaMock.order.create.mockRejectedValue(new Error('create order failed'));

    await expect(
      Order.createOrder(createDataMockWithoutCoupon)
    ).rejects.toThrow('create order failed');
  });
});
