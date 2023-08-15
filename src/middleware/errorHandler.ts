import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../utils/'

import { env } from '../env'

export const erroHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number

  if (err instanceof CustomError) {
    statusCode = err.statusCode
    delete err.stack
  } else {
    statusCode = res.statusCode !== 200 ? res.statusCode : 500
  }

  res.status(statusCode)
  res.json({
    message: err.message,
    stack: env.NODE_ENV === 'production' ? 'error' : err.stack,
  })

  return next()
}
