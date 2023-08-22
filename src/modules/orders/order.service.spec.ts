import * as Order from './order.service'
import * as Product from '../products/product.service'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createDataMock,
  createDataMockWithoutCoupon,
  queryOrder,
  queryOrderById,
  selectMock,
} from '../../mocks/order.mock'
import { products } from '../../mocks/product.mock'

export const prismaMock = {
  order: {
    create: vi.fn(),
    findMany: vi.fn(),
    findById: vi.fn(),
  },
  product: {
    findById: vi.fn(),
  },
}

describe('Order Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('when creating order', () => {
    it('should return the order with the correct properties', async () => {
      vi.spyOn(Order, 'createOrder').mockImplementation(async () => {
        const user = await prismaMock.order.create({ data: createDataMock })
        return user
      })
      prismaMock.order.create.mockResolvedValue(createDataMock)
      const result = await Order.createOrder(createDataMock)

      expect(prismaMock.order.create).toHaveBeenCalledWith({
        data: createDataMock,
      })
      expect(result).toHaveProperty('products')
      expect(result).toHaveProperty('userId')
      expect(result).toHaveProperty('couponId')
      expect(result).toEqual(createDataMock)
    })

    it('should return an error if create request fails', async () => {
      prismaMock.order.create.mockRejectedValue(
        new Error('create order failed'),
      )

      await expect(Order.createOrder(createDataMock)).rejects.toThrow(
        'create order failed',
      )
    })
  })

  describe('when creating order without coupon', () => {
    it('should return the order with the correct properties', async () => {
      vi.spyOn(Order, 'createOrder').mockImplementation(async () => {
        const user = await prismaMock.order.create({
          data: createDataMockWithoutCoupon,
        })
        return user
      })
      prismaMock.order.create.mockResolvedValue(createDataMockWithoutCoupon)
      const result = await Order.createOrder(createDataMockWithoutCoupon)

      expect(prismaMock.order.create).toHaveBeenCalledWith({
        data: createDataMockWithoutCoupon,
      })
      expect(result).toHaveProperty('products')
      expect(result).toHaveProperty('userId')
      expect(result).toEqual(createDataMockWithoutCoupon)
    })

    it('should return an error if create request fails', async () => {
      prismaMock.order.create.mockRejectedValue(
        new Error('create order failed'),
      )

      await expect(
        Order.createOrder(createDataMockWithoutCoupon),
      ).rejects.toThrow('create order failed')
    })
  })

  describe('when query an order', () => {
    it('shoul querys orders with default options', async () => {
      vi.spyOn(Order, 'findAllOrders').mockImplementation(async () => {
        const order = await prismaMock.order.findMany({
          where: { revoked: false },
          select: selectMock,
          skip: 0,
          take: 10,
          orderBy: undefined,
        })

        return order
      })
      const filter = { revoked: false }
      prismaMock.order.findMany.mockResolvedValue(queryOrder)

      const result = await Order.findAllOrders(filter, {})

      expect(result).toEqual(queryOrder)
      expect(prismaMock.order.findMany).toHaveBeenCalledWith({
        where: filter,
        select: selectMock,
        skip: 0,
        take: 10,
        orderBy: undefined,
      })
    })

    it('should return an empty array if no order is found', async () => {
      const filter = { revoked: false }
      prismaMock.order.findMany.mockResolvedValue([])

      const result = await Order.findAllOrders(filter, {})
      expect(result).toEqual([])
    })

    it('should correctly apply the limit and page options', async () => {
      const filter = { revoked: true }
      const options = { limit: 5, page: 2 }

      vi.spyOn(Order, 'findAllOrders').mockImplementation(async () => {
        const order = await prismaMock.order.findMany({
          where: { revoked: true },
          select: selectMock,
          skip: 5,
          take: options.limit,
          orderBy: undefined,
        })

        return order
      })
      prismaMock.order.findMany.mockResolvedValue([])

      await Order.findAllOrders(filter, options)
      expect(prismaMock.order.findMany).toHaveBeenCalledWith({
        where: filter,
        select: selectMock,
        skip: 5,
        take: options.limit,
        orderBy: undefined,
      })
    })
  })

  describe('when get order by id', () => {
    it('should gets an order by id', async () => {
      vi.spyOn(Order, 'findOrderById').mockImplementation(async () => {
        const order = await prismaMock.order.findById({
          where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
          select: selectMock,
        })
        return order
      })
      prismaMock.order.findById.mockResolvedValue(queryOrderById)
      const result = await Order.findOrderById(
        '598641f1-1b95-45c0-a11a-37958de2b63c',
      )

      expect(result).toEqual(queryOrderById)
      expect(prismaMock.order.findById).toHaveBeenCalledWith({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
        select: selectMock,
      })
    })

    it('should throw an error if no order is found', async () => {
      prismaMock.order.findById.mockRejectedValue(new Error('Order not found'))

      // eslint-disable-next-line prettier/prettier
      await expect(Order.findOrderById('598641f1-1b95-45c0-a11a-37958de2b63c')).rejects.toThrow('Order not found')
    })
  })

  describe('sumProductsPrice', () => {
    it('correctly calculates the sum of product prices', async () => {
      const getproducts = [
        '598641f1-1b95-45c0-a11a-37958de2b63c',
        '598641f1-1b95-45c0-a11a-37958de2b63r',
      ]
      const valueDiscount = 5

      vi.spyOn(Product, 'findProductById')
        .mockResolvedValueOnce(products[0])
        .mockResolvedValueOnce(products[1])

      const result = await Order.sumProductsPrice({
        products: getproducts,
        valueDiscount,
      })

      expect(result).toBe('195.00')
    })

    it('handles missing products', async () => {
      const getproducts = [
        '598641f1-1b95-45c0-a11a-37958de2b63c',
        '598641f1-1b95-45c0-a11a-37958de2b63r',
      ]
      const valueDiscount = 2

      vi.spyOn(Product, 'findProductById').mockImplementation(async () => {
        const product = await prismaMock.product.findById({
          where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
          select: selectMock,
        })
        return product
      })
      prismaMock.product.findById.mockResolvedValue(null)

      const result = await Order.sumProductsPrice({
        products: getproducts,
        valueDiscount,
      })

      expect(result).toBe('0.00')
    })

    it('handles no discount', async () => {
      const getproducts = [
        '598641f1-1b95-45c0-a11a-37958de2b63c',
        '598641f1-1b95-45c0-a11a-37958de2b63r',
      ]
      prismaMock.product.findById
        .mockResolvedValueOnce(products[0])
        .mockResolvedValueOnce(products[1])

      const result = await Order.sumProductsPrice({
        products: getproducts,
        valueDiscount: 0,
      })

      expect(result).toBe('200.00')
    })
  })
})
