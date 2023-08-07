import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'

const accessToken = process.env.JWT_ACCESS_SECRET || 'dhvbsufnisbfhwbfuiwjiofw'
// const refreshSecret =
//   process.env.JWT_REFRESH_SECRET || 'dhvbsufnisbfhwbfuiwjiofw'

export const generateAcessToken = (user: User) => {
  if (process.env.JWT_ACCESS_SECRET) {
    return jwt.sign({ userId: user.id }, accessToken, {
      expiresIn: '1d',
    })
  }
}

export const generateRefreshToken = (user: User, jwtId: string) => {
  if (process.env.JWT_REFRESH_SECRET) {
    return jwt.sign(
      { userId: user.id, jwtId },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: '4h',
      },
    )
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
