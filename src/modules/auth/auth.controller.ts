import { Request, Response } from 'express'
import { register, authenticatedUserByEmailAndPassword } from './auth.service'

export const create = async (req: Request, res: Response) => {
  const { email, password, name, gitHubId } = req.body
  const result = await register({ email, password, name, gitHubId })

  res.json(result)
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const result = await authenticatedUserByEmailAndPassword(email, password)

  return res.json(result)
}
