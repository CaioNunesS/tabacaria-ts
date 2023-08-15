import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'

import { env } from '../env'

const accessToken = env.JWT_ACCESS_SECRET

export const generateAcessToken = (user: User) => {
  if (env.JWT_ACCESS_SECRET) {
    return jwt.sign({ userId: user.id }, accessToken, {
      expiresIn: '1d',
    })
  }
}

export const generateRefreshToken = (user: User, jwtId: string) => {
  if (env.JWT_REFRESH_SECRET) {
    return jwt.sign({ userId: user.id, jwtId }, env.JWT_REFRESH_SECRET, {
      expiresIn: '4h',
    })
  }
}

export const generateTokens = (user: User, jwtId: string) => {
  const accessToken = generateAcessToken(user)
  const refreshToken = generateRefreshToken(user, jwtId)

  return {
    accessToken,
    refreshToken,
  }
}
