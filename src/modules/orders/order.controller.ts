import { Request, Response } from 'express'
import { createOrder, findAllOrders, findOrderById } from './order.service'
import httpStatus from 'http-status'
import pick from '../../utils/pick'

export const create = async (req: Request, res: Response) => {
  const { products, couponId } = req.body
  const { userId } = req.payload

  const coupon = couponId || null

  const result = await createOrder({ products, couponId: coupon, userId })

  return res.json({
    data: result,
    message: 'Pedido criado com sucesso',
  })
}

export const findAll = async (req: Request, res: Response) => {
  const filter = pick(req.query, [
    'id',
    'createdAt',
    'updatedAt',
    'value',
    'userId',
  ])
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortType'])
  const result = await findAllOrders(filter, options)

  res.json(result)
}

export const findById = async (req: Request, res: Response) => {
  const { orderId } = req.params
  const result = await findOrderById(orderId)

  return res.json(result)
}
