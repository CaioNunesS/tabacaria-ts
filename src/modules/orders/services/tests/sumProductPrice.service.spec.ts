import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as Product from '../../../products/services/findProductById.service';
import * as Order from '../sumProductsPrice.service';
import { products } from '../../../../mocks/product.mock';
import { selectMock } from '../../../../mocks/order.mock';

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

describe('sumProductsPrice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should correctly calculates the sum of product prices', async () => {
    const getproducts = [
      '598641f1-1b95-45c0-a11a-37958de2b63c',
      '598641f1-1b95-45c0-a11a-37958de2b63r',
    ];
    const valueDiscount = 5;

    vi.spyOn(Product, 'findProductById')
      .mockResolvedValueOnce(products[0])
      .mockResolvedValueOnce(products[1]);

    const result = await Order.sumProductsPrice({
      products: getproducts,
      valueDiscount,
    });

    expect(result).toBe('195.00');
  });

  it('should handles missing products', async () => {
    const getproducts = [
      '598641f1-1b95-45c0-a11a-37958de2b63c',
      '598641f1-1b95-45c0-a11a-37958de2b63r',
    ];
    const valueDiscount = 2;

    vi.spyOn(Product, 'findProductById').mockImplementation(async () => {
      const product = await prismaMock.product.findById({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
        select: selectMock,
      });
      return product;
    });
    prismaMock.product.findById.mockResolvedValue(null);

    const result = await Order.sumProductsPrice({
      products: getproducts,
      valueDiscount,
    });

    expect(result).toBe('0.00');
  });

  it('should handles no discount', async () => {
    const getproducts = [
      '598641f1-1b95-45c0-a11a-37958de2b63c',
      '598641f1-1b95-45c0-a11a-37958de2b63r',
    ];
    prismaMock.product.findById
      .mockResolvedValueOnce(products[0])
      .mockResolvedValueOnce(products[1]);

    const result = await Order.sumProductsPrice({
      products: getproducts,
      valueDiscount: 0,
    });

    expect(result).toBe('200.00');
  });
});
