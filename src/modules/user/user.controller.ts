import { Request, Response } from 'express'
import {
  deleteUser,
  findAllUsers,
  findUserByEmail,
  getUserById,
  updateUser,
} from './user.service'

import pick from '../../utils/pick'
import httpStatus from 'http-status'

export const profile = async (req: Request, res: Response) => {
  const { userId } = req.payload

  const result = await getUserById(userId)

  return res.json(result)
}

export const findAll = async (req: Request, res: Response) => {
  const filter = pick(req.query, ['id', 'name', 'email', 'createdAt'])
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortType'])
  const result = await findAllUsers(filter, options)

  res.json(result)
}

export const findOne = async (req: Request, res: Response) => {
  const { userId } = req.params
  const client = await getUserById(userId)
  res.json(client)
}

export const deleteOne = async (req: Request, res: Response) => {
  const { userId } = req.params
  await deleteUser(userId)

  return res.status(httpStatus.NO_CONTENT).send()
}

export const findOneByEmail = async (req: Request, res: Response) => {
  const { email } = req.query

  if (typeof email === 'string') {
    const result = await findUserByEmail(email)

    res.json(result)
  }
}

export const updateOne = async (req: Request, res: Response) => {
  const { userId } = req.params
  const { name, email, role } = req.body
  const teste = {
    name,
    email,
    role,
  }

  const result = await updateUser(userId, teste)

  res.json(result)
}
