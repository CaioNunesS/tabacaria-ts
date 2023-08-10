import { hashSync } from 'bcrypt'
import { db } from '../../config/index'
import { throwError } from '../../utils/index'
import { User, Prisma } from '@prisma/client'
import httpStatus from 'http-status'

type userCreate = {
  email: string
  password: string
  name: string
  gitHubId?: string
}

type updateUserResponse = {
  id: string
  name: string
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export const findUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        githubId: true,
        googleId: true,
        password: true,
        verificationCode: true,
      },
    })

    return user
  } catch (error) {
    throwError('Usuário não encontrado', httpStatus.NOT_FOUND)
  }
}

export const createUser = async (user: userCreate) => {
  try {
    user.password = hashSync(user.password, 12)
    return db.user.create({
      data: user,
    })
  } catch (error) {
    throwError('Erro ao criar usuário', httpStatus.BAD_REQUEST)
  }
}

export const findAllUsers = async <Key extends keyof User>(
  filter: {
    id?: string
    name?: string
    email?: string
  },
  options: {
    limit?: number
    page?: number
    sortBy?: string
    sortType?: 'asc' | 'desc'
  },
  keys: Key[] = [
    'id',
    'name',
    'email',
    'role',
    'createdAt',
    'updatedAt',
  ] as Key[],
): Promise<Pick<User, Key>[]> => {
  const page = options.page ?? 1
  const limit = options.limit ?? 10
  const sortBy = options.sortBy
  const sortType = options.sortType ?? 'desc'

  const customer = await db.user.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  })
  if (customer.length === 0)
    throwError('Usuário não encontrado', httpStatus.NOT_FOUND)

  return customer as Pick<User, Key>[]
}

export const findUserById = async <Key extends keyof User>(
  id: string,
  keys: Key[] = [
    'id',
    'name',
    'email',
    'role',
    'createdAt',
    'updatedAt',
  ] as Key[],
): Promise<Pick<User, Key> | undefined> => {
  try {
    const getUser = await db.user.findUnique({
      where: { id },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    })
    if (!getUser) throwError('Usuário não encontrado', httpStatus.NOT_FOUND)

    return getUser as Pick<User, Key>
  } catch (error) {
    throwError('Usuário não encontrado ---', httpStatus.NOT_FOUND)
  }
}

export const updateUser = async <Key extends keyof User>(
  userId: string,
  updateBody: Prisma.UserUpdateInput,
  keys: Key[] = [
    'id',
    'name',
    'email',
    'role',
    'createdAt',
    'updatedAt',
  ] as Key[],
): Promise<updateUserResponse | null> => {
  const user = await findUserById(userId, [
    'id',
    'name',
    'email',
    'role',
    'createdAt',
    'updatedAt',
  ])

  if (!user) throwError('Usuário não encontrado', httpStatus.NOT_FOUND)
  const updatedUser = await db.user.update({
    where: { id: userId },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  })
  return updatedUser as updateUserResponse | null
}

export const deleteUser = async (userId: string): Promise<User> => {
  const user = await findUserById(userId, ['id'])

  if (!user) throwError('Usuário não encontrado', httpStatus.NOT_FOUND)

  return await db.user.delete({ where: { id: userId } })
}
