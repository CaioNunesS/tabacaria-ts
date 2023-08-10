import { Request, Response } from 'express'
import {
  createProduct,
  findProductById,
  findAllProducts,
  deleteProduct,
  updateProduct,
} from './product.service'

import pick from '../../utils/pick'
import httpStatus from 'http-status'

export const create = async (req: Request, res: Response) => {
  const { name, price, photo, description } = req.body

  const result = await createProduct({ name, price, photo, description })

  return res.status(httpStatus.CREATED).json(result)
}

export const findById = async (req: Request, res: Response) => {
  const { productId } = req.params
  const result = await findProductById(productId)

  return res.json(result)
}

export const findAll = async (req: Request, res: Response) => {
  const filter = pick(req.query, [
    'id',
    'name',
    'email',
    'role',
    'createdAt',
    'updatedAt',
  ])
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortType'])
  const result = await findAllProducts(filter, options)

  res.json(result)
}

export const deleteOne = async (req: Request, res: Response) => {
  const { productId } = req.params
  deleteProduct(productId)

  res.status(httpStatus.NO_CONTENT).send()
}

export const updateOne = async (req: Request, res: Response) => {
  const { productId } = req.params
  const { name, price, photo, description } = req.body
  const updatedProduct = {
    name,
    price,
    photo,
    description,
  }
  const result = await updateProduct(productId, updatedProduct)

  res.json(result)
}
