import { faker } from '@faker-js/faker'
import { v4 as uuid } from 'uuid'
import { Products } from '@prisma/client'
import { IcreateProduct } from '../modules/products/product.service'

export const createDataMock: IcreateProduct = {
  id: uuid(),
  name: faker.word.sample(),
  price: '100',
  description: faker.word.sample(),
  createdAt: new Date(),
  updatedAt: new Date(),
  ativo: true,
}

export const queryProduct = [
  {
    id: uuid(),
    ativo: true,
    name: faker.word.sample(),
    price: '100',
    description: faker.word.sample(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuid(),
    ativo: true,
    name: faker.word.sample(),
    price: '100',
    description: faker.word.sample(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const queryProductById: Products = {
  id: '598641f1-1b95-45c0-a11a-37958de2b63c',
  ativo: true,
  name: faker.word.sample(),
  price: '100',
  description: faker.word.sample(),
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const selectMock = {
  id: true,
  name: true,
  description: true,
  ativo: true,
  price: true,
  createdAt: true,
  updatedAt: true,
}
