import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import { Products } from '@prisma/client';
import { IcreateProduct } from '../modules/products/services';

export const createDataMock: IcreateProduct = {
  id: uuid(),
  name: faker.word.sample(),
  price: '100',
  description: faker.word.sample(),
  createdAt: new Date(),
  updatedAt: new Date(),
  active: true,
};

export const queryProduct = [
  {
    id: uuid(),
    active: true,
    name: faker.word.sample(),
    price: '100',
    description: faker.word.sample(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuid(),
    active: true,
    name: faker.word.sample(),
    price: '100',
    description: faker.word.sample(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const queryProductById: Products = {
  id: '598641f1-1b95-45c0-a11a-37958de2b63c',
  active: true,
  name: faker.word.sample(),
  price: '100',
  description: faker.word.sample(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const products = [
  {
    id: '598641f1-1b95-45c0-a11a-37958de2b63c',
    active: true,
    name: faker.word.sample(),
    price: '100',
    description: faker.word.sample(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '598641f1-1b95-45c0-a11a-37958de2b63r',
    active: true,
    name: faker.word.sample(),
    price: '100',
    description: faker.word.sample(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const selectMock = {
  id: true,
  name: true,
  description: true,
  active: true,
  price: true,
  createdAt: true,
  updatedAt: true,
};
