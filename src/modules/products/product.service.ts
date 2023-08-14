import { Prisma, Products } from '@prisma/client'
import { db } from '../../config/index'
import { throwError } from '../../utils/index'
import httpStatus from 'http-status'

type IcreateProduct = {
  name: string
  price: string
  photo?: string
  description: string
}

type updateProductResponse = {
  id: string
  name: string
  price: string
  photo: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export const createProduct = async ({
  name,
  price,
  photo,
  description,
}: IcreateProduct) => {
  try {
    const getProduct = await findProductByName(name)
    if (getProduct) {
      throwError('Produto já cadastrado', httpStatus.BAD_REQUEST)
    }

    const result = await db.products.create({
      data: {
        name,
        price,
        photo,
        description,
      },
    })

    return result
  } catch (error) {
    throwError('Erro ao cadastrar produto', httpStatus.BAD_REQUEST)
  }
}

export const findProductByName = async <Key extends keyof Products>(
  name: string,
  keys: Key[] = [
    'id',
    'name',
    'price',
    'photo',
    'description',
    'createdAt',
    'updatedAt',
  ] as Key[],
): Promise<Pick<Products, Key> | undefined> => {
  const result = await db.products.findFirst({
    where: { name },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  })

  return result as Pick<Products, Key>
}

export const findProductById = async <Key extends keyof Products>(
  id: string,
  keys: Key[] = [
    'id',
    'name',
    'price',
    'photo',
    'description',
    'createdAt',
    'updatedAt',
  ] as Key[],
): Promise<Pick<Products, Key> | undefined> => {
  const getProduct = await db.products.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  })

  if (!getProduct) throwError('Produto não encontrado', httpStatus.NOT_FOUND)

  return getProduct as Pick<Products, Key>
}

export const findAllProducts = async <Key extends keyof Products>(
  filter: {
    id?: string
    name?: string
    price?: string
    description?: string
    createdAt?: Date
    updatedAt?: Date
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
    'price',
    'photo',
    'createdAt',
    'updatedAt',
  ] as Key[],
): Promise<Pick<Products, Key>[]> => {
  const page = options.page ?? 1
  const limit = options.limit ?? 10
  const sortBy = options.sortBy
  const sortType = options.sortType ?? 'desc'

  const product = await db.products.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  })

  return product as Pick<Products, Key>[]
}

export const deleteProduct = async (id: string): Promise<Products> => {
  const product = await findProductById(id)

  if (!product) throwError('Produto não encontrado', httpStatus.NOT_FOUND)

  return await db.products.delete({ where: { id } })
}

export const updateProduct = async <Key extends keyof Products>(
  id: string,
  updateBody: Prisma.ProductsUpdateInput,
  keys: Key[] = ['id', 'name', 'price', 'photo', 'description'] as Key[],
): Promise<updateProductResponse | null> => {
  const product = await findProductById(id, [
    'id',
    'name',
    'price',
    'photo',
    'description',
  ])

  if (!product) throwError('Produto não encontrado', httpStatus.NOT_FOUND)

  const result = await db.products.update({
    where: { id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  })
  return result as updateProductResponse | null
}

export const findProductByImageName = async <Key extends keyof Products>(
  imageName: string,
  keys: Key[] = [
    'id',
    'name',
    'price',
    'photo',
    'description',
    'createdAt',
    'updatedAt',
  ] as Key[],
): Promise<Pick<Products, Key> | undefined> => {
  const result = await db.products.findFirst({
    where: { photo: { contains: imageName } },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  })
  return result as unknown as Pick<Products, Key> | undefined
}
