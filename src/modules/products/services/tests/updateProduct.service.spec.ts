import { describe, expect, it, vi } from 'vitest';
import * as Product from '../updateProduct.service';
import { queryProductById } from '../../../../mocks/product.mock';

export const prismaMock = {
  product: {
    create: vi.fn(),
    findMany: vi.fn(),
    findById: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
  },
};

describe('when update an order', () => {
  vi.spyOn(Product, 'updateProduct').mockImplementation(async () => {
    const user = await prismaMock.product.update({
      where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
      data: { active: false },
    });
    return user;
  });
  prismaMock.product.findById.mockResolvedValue(queryProductById);

  it('should updates an product', async () => {
    const updateBody = { active: false };
    prismaMock.product.update.mockResolvedValue({
      ...queryProductById,
      ...updateBody,
    });
    prismaMock.product.findById.mockResolvedValue(queryProductById);

    const result = await Product.updateProduct(
      '598641f1-1b95-45c0-a11a-37958de2b63c',
      updateBody
    );

    expect(result).toEqual({ ...queryProductById, ...updateBody });
  });

  it('should throws an error if the product is not found', async () => {
    const updateBody = { active: false };

    prismaMock.product.update.mockRejectedValue(new Error('Product not found'));

    await expect(
      // eslint-disable-next-line prettier/prettier
        Product.updateProduct('598641f1-1b95-45c0-a11a-37958de2b63c', updateBody)).rejects.toThrow(new Error('Product not found'))
  });
});
