import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as Product from '../createProduct.service';
import { createDataMock } from '../../../../mocks/product.mock';

export const prismaMock = {
  product: {
    create: vi.fn(),
    findMany: vi.fn(),
    findById: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
  },
};

describe('when creating a new product', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the product with correct properties', async () => {
    vi.spyOn(Product, 'createProduct').mockImplementation(async () => {
      const product = await prismaMock.product.create({
        data: createDataMock,
      });
      return product;
    });
    prismaMock.product.create.mockResolvedValue(createDataMock);
    const result = await Product.createProduct(createDataMock);

    expect(prismaMock.product.create).toHaveBeenCalledWith({
      data: createDataMock,
    });
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('price');
    expect(result).toEqual(createDataMock);
  });

  it('should return an error if create request fails', async () => {
    prismaMock.product.create.mockRejectedValue(
      new Error('create product failed')
    );

    await expect(Product.createProduct(createDataMock)).rejects.toThrow(
      'create product failed'
    );
  });
});
