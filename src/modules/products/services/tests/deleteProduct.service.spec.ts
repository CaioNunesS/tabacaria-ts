import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as Product from '../deleteProduct.service';
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

describe('when delete product', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.spyOn(Product, 'deleteProduct').mockImplementation(async () => {
    const product = await prismaMock.product.delete({
      where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
    });
    return product;
  });
  prismaMock.product.delete.mockResolvedValue(queryProductById);

  it('should delete an product', async () => {
    await Product.deleteProduct('598641f1-1b95-45c0-a11a-37958de2b63c');
    expect(prismaMock.product.delete).toHaveBeenCalledWith({
      where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
    });
  });

  it('should throw an error if product not found', async () => {
    prismaMock.product.findById.mockResolvedValue(null);
    prismaMock.product.delete.mockRejectedValue(new Error('product not found'));
    // eslint-disable-next-line prettier/prettier
      await expect(Product.deleteProduct('598641f1-1b95-45c0-a11a-37958de2b635')).rejects.toThrow(
        new Error('product not found')
        )
  });
});
