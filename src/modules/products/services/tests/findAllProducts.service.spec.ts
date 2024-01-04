import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as Product from '../findAllProducts.service';
import { queryProduct, selectMock } from '../../../../mocks/product.mock';

export const prismaMock = {
  product: {
    create: vi.fn(),
    findMany: vi.fn(),
    findById: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
  },
};

describe('when query an product', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should querys products with default options', async () => {
    vi.spyOn(Product, 'findAllProducts').mockImplementation(async () => {
      const product = await prismaMock.product.findMany({
        where: { active: true },
        select: selectMock,
        skip: 0,
        take: 10,
        orderBy: undefined,
      });

      return product;
    });
    const filter = { active: true };
    const keys: (
      | 'id'
      | 'name'
      | 'description'
      | 'active'
      | 'createdAt'
      | 'updatedAt'
      | 'price'
    )[] = [
      'id',
      'name',
      'description',
      'active',
      'createdAt',
      'updatedAt',
      'price',
    ];
    prismaMock.product.findMany.mockResolvedValue(queryProduct);

    const result = await Product.findAllProducts(filter, {}, keys);

    expect(result).toEqual(queryProduct);
    expect(prismaMock.product.findMany).toHaveBeenCalledWith({
      where: filter,
      select: selectMock,
      skip: 0,
      take: 10,
      orderBy: undefined,
    });
  });

  it('should return an empty array if no product is found', async () => {
    const filter = { active: true };
    const keys: (
      | 'id'
      | 'name'
      | 'description'
      | 'active'
      | 'createdAt'
      | 'updatedAt'
      | 'price'
    )[] = [
      'id',
      'name',
      'description',
      'active',
      'createdAt',
      'updatedAt',
      'price',
    ];
    prismaMock.product.findMany.mockResolvedValue([]);

    const result = await Product.findAllProducts(filter, {}, keys);
    expect(result).toEqual([]);
  });

  it('should correctly apply the limit and page options', async () => {
    const filter = { active: true };
    const options = { limit: 5, page: 2 };
    const keys: (
      | 'id'
      | 'name'
      | 'description'
      | 'active'
      | 'createdAt'
      | 'updatedAt'
      | 'price'
    )[] = [
      'id',
      'name',
      'description',
      'active',
      'createdAt',
      'updatedAt',
      'price',
    ];
    vi.spyOn(Product, 'findAllProducts').mockImplementation(async () => {
      const product = await prismaMock.product.findMany({
        where: { active: true },
        select: selectMock,
        skip: 5,
        take: options.limit,
        orderBy: undefined,
      });

      return product;
    });

    await Product.findAllProducts(filter, options, keys);
    expect(prismaMock.product.findMany).toHaveBeenCalledWith({
      where: filter,
      select: selectMock,
      skip: 5,
      take: options.limit,
      orderBy: undefined,
    });
  });
});
