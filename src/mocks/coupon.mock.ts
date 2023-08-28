import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import { IcreateCoupon } from '../modules/coupons/coupon.service';
import { Coupons } from '@prisma/client';

export const createDataMock: IcreateCoupon = {
  id: uuid(),
  title: faker.word.sample(),
  description: faker.word.sample(),
  value: '10',
  createdAt: new Date(),
  updatedAt: new Date(),
  revoked: false,
};

export const queryCoupon = [
  {
    id: uuid(),
    title: faker.word.sample(),
    description: faker.word.sample(),
    value: '10',
    createdAt: new Date(),
    updatedAt: new Date(),
    revoked: false,
  },
  {
    id: uuid(),
    title: faker.word.sample(),
    description: faker.word.sample(),
    value: '10',
    createdAt: new Date(),
    updatedAt: new Date(),
    revoked: false,
  },
];

export const queryCouponById: Coupons = {
  id: '598641f1-1b95-45c0-a11a-37958de2b63c',
  title: faker.word.sample(),
  description: faker.word.sample(),
  value: '10',
  revoked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const queryCouponByTitle: Coupons = {
  id: '598641f1-1b95-45c0-a11a-37958de2b63c',
  title: 'teste',
  description: faker.word.sample(),
  value: '10',
  revoked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const selectMock = {
  id: true,
  title: true,
  value: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  revoked: true,
};
