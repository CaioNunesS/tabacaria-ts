import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as Product from '../findProductById.service';
import { queryProductById, selectMock } from '../../../../mocks/product.mock';

export const prismaMock = {
  product: {
    create: vi.fn(),
    findMany: vi.fn(),
    findById: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
  },
};

describe('when get product by id', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should gets an product by id', async () => {
    vi.spyOn(Product, 'findProductById').mockImplementation(async () => {
      const product = await prismaMock.product.findById({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
        select: selectMock,
      });
      return product;
    });
    prismaMock.product.findById.mockResolvedValue(queryProductById);
    const result = await Product.findProductById(
      '598641f1-1b95-45c0-a11a-37958de2b63c'
    );

    expect(result).toEqual(queryProductById);
    expect(prismaMock.product.findById).toHaveBeenCalledWith({
      where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
      select: selectMock,
    });
  });

  it('should throw an error if no product is found', async () => {
    prismaMock.product.findById.mockRejectedValue(
      new Error('Product not found')
    );

    await expect(
      // eslint-disable-next-line prettier/prettier
        Product.findProductById('598641f1-1b95-45c0-a11a-37958de2b63e')).rejects.toThrow('Product not found')
  });
});
