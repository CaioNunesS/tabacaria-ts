import * as Product from './product.service'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createDataMock,
  queryProduct,
  selectMock,
  queryProductById,
} from '../../mocks/product.mock'

export const prismaMock = {
  product: {
    create: vi.fn(),
    findMany: vi.fn(),
    findById: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
  },
}

describe.only('Product Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('when creating a new product', () => {
    vi.spyOn(Product, 'createProduct').mockImplementation(async () => {
      const user = await prismaMock.product.create({ data: createDataMock })
      return user
    })
    it('should return the product with correct properties', async () => {
      prismaMock.product.create.mockResolvedValue(createDataMock)
      const result = await Product.createProduct(createDataMock)

      expect(prismaMock.product.create).toHaveBeenCalledWith({
        data: createDataMock,
      })
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('description')
      expect(result).toHaveProperty('price')
      expect(result).toEqual(createDataMock)
    })

    it('should return an error if create request fails', async () => {
      prismaMock.product.create.mockRejectedValue(
        new Error('create product failed'),
      )

      await expect(Product.createProduct(createDataMock)).rejects.toThrow(
        'create product failed',
      )
    })
  })

  describe('when query an product', () => {
    vi.spyOn(Product, 'findAllProducts').mockImplementation(async () => {
      const user = await prismaMock.product.findMany({
        where: { ativo: true },
        select: selectMock,
        skip: 0,
        take: 10,
        orderBy: undefined,
      })

      return user
    })

    it('should querys products with default options', async () => {
      const filter = { ativo: true }
      const keys: (
        | 'id'
        | 'name'
        | 'description'
        | 'ativo'
        | 'createdAt'
        | 'updatedAt'
        | 'price'
      )[] = [
        'id',
        'name',
        'description',
        'ativo',
        'createdAt',
        'updatedAt',
        'price',
      ]
      prismaMock.product.findMany.mockResolvedValue(queryProduct)

      const result = await Product.findAllProducts(filter, {}, keys)

      expect(result).toEqual(queryProduct)
      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: filter,
        select: selectMock,
        skip: 0,
        take: 10,
        orderBy: undefined,
      })
    })

    it('should return an empty array if no product is found', async () => {
      const filter = { ativo: true }
      const keys: (
        | 'id'
        | 'name'
        | 'description'
        | 'ativo'
        | 'createdAt'
        | 'updatedAt'
        | 'price'
      )[] = [
        'id',
        'name',
        'description',
        'ativo',
        'createdAt',
        'updatedAt',
        'price',
      ]
      prismaMock.product.findMany.mockResolvedValue([])

      const result = await Product.findAllProducts(filter, {}, keys)
      expect(result).toEqual([])
    })

    it('should corretly apply the limit and page options', async () => {
      const filter = { ativo: true }
      const options = { limit: 5, page: 2 }
      const keys: (
        | 'id'
        | 'name'
        | 'description'
        | 'ativo'
        | 'createdAt'
        | 'updatedAt'
        | 'price'
      )[] = [
        'id',
        'name',
        'description',
        'ativo',
        'createdAt',
        'updatedAt',
        'price',
      ]
      vi.spyOn(Product, 'findAllProducts').mockImplementation(async () => {
        const user = await prismaMock.product.findMany({
          where: { ativo: true },
          select: selectMock,
          skip: 5,
          take: options.limit,
          orderBy: undefined,
        })

        return user
      })
      prismaMock.product.findMany.mockResolvedValue([])

      await Product.findAllProducts(filter, options, keys)
      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: filter,
        select: selectMock,
        skip: 5,
        take: options.limit,
        orderBy: undefined,
      })
    })
  })

  describe('when get product by id', async () => {
    vi.spyOn(Product, 'findProductById').mockImplementation(async () => {
      const user = await prismaMock.product.findById({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
        select: selectMock,
      })
      return user
    })
    prismaMock.product.findById.mockResolvedValue(queryProductById)
    it('should gets an user by id', async () => {
      const result = await Product.findProductById(
        '598641f1-1b95-45c0-a11a-37958de2b63c',
      )

      expect(result).toEqual(queryProductById)
      expect(prismaMock.product.findById).toHaveBeenCalledWith({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
        select: selectMock,
      })
    })

    it('should should throw an error if no user is found', async () => {
      prismaMock.product.findById.mockRejectedValue(new Error('User not found'))

      await expect(
        Product.findProductById('598641f1-1b95-45c0-a11a-37958de2b63e'),
      ).rejects.toThrow('User not found')
    })
  })

  describe('when delete User', () => {
    vi.spyOn(Product, 'deleteProduct').mockImplementation(async () => {
      const user = await prismaMock.product.delete({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
      })
      return user
    })
    prismaMock.product.delete.mockResolvedValue(queryProductById)

    it('should delete an user', async () => {
      await Product.deleteProduct('598641f1-1b95-45c0-a11a-37958de2b63c')
      expect(prismaMock.product.delete).toHaveBeenCalledWith({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
      })
    })

    it('should throw an error if user not found', async () => {
      prismaMock.product.findById.mockResolvedValue(null)
      prismaMock.product.delete.mockRejectedValue(new Error('user not found'))
      // eslint-disable-next-line prettier/prettier
      await expect(Product.deleteProduct('598641f1-1b95-45c0-a11a-37958de2b635')).rejects.toThrow(new Error('user not found'))
    })
  })

  describe('when update user', () => {
    vi.spyOn(Product, 'updateProduct').mockImplementation(async () => {
      const user = await prismaMock.product.update({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
        data: { ativo: false },
      })
      return user
    })
    prismaMock.product.findById.mockResolvedValue(queryProductById)

    it('should updates an user', async () => {
      const updateBody = { ativo: false }
      prismaMock.product.update.mockResolvedValue({
        ...queryProductById,
        ...updateBody,
      })
      prismaMock.product.findById.mockResolvedValue(queryProductById)

      const result = await Product.updateProduct(
        '598641f1-1b95-45c0-a11a-37958de2b63c',
        updateBody,
      )

      expect(result).toEqual({ ...queryProductById, ...updateBody })
    })

    it('should throws an error if the user is not found', async () => {
      const updateBody = { ativo: false }

      prismaMock.product.update.mockRejectedValue(new Error('User not found'))

      await expect(
        // eslint-disable-next-line prettier/prettier
        Product.updateProduct('598641f1-1b95-45c0-a11a-37958de2b63c', updateBody)).rejects.toThrow(new Error('User not found'))
    })
  })
})
