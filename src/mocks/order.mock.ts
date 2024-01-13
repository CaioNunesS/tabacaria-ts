import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import { ICreateOrder } from '../modules/orders/services/createOrder.service';
import { Orders } from '@prisma/client';

export const createDataMock: ICreateOrder = {
  id: uuid(),
  value: faker.word.noun(),
  products: [faker.word.sample()],
  userId: faker.word.sample(),
  couponId: faker.word.sample(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const createDataMockWithoutCoupon: ICreateOrder = {
  id: uuid(),
  value: faker.word.noun(),
  products: [faker.word.sample()],
  userId: faker.word.sample(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const queryOrder = [
  {
    id: uuid(),
    value: faker.word.noun(),
    products: [faker.word.sample()],
    userId: faker.word.sample(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuid(),
    value: faker.word.noun(),
    products: [faker.word.sample()],
    userId: faker.word.sample(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const queryOrderById: Orders = {
  id: '598641f1-1b95-45c0-a11a-37958de2b63c',
  value: faker.word.noun(),
  //   products: [faker.word.sample()],
  userId: faker.word.sample(),
  couponsId: faker.word.sample(),
  createdAt: new Date(),
  updatedAt: new Date(),
  discount: '10',
  isPaid: true,
};

export const selectMock = {
  id: true,
  value: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
  couponsId: true,
  isPaid: true,
  discount: true,
};
