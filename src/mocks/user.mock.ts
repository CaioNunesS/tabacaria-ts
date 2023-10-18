import { faker } from '@faker-js/faker';
import { IuserCreate } from '../modules/user/user.service';
import { hashSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';

export const createDataMock: IuserCreate = {
  id: uuid(),
  email: faker.internet.email(),
  name: faker.word.sample(),
  password: hashSync(faker.word.sample(), 12),
  gitHubId: faker.word.sample(),
  googleId: faker.word.sample(),
  verificationCode: faker.word.sample(),
  role: 'CLIENT',
  phoneNumber: '11943956693',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const queryUserMock = [
  {
    id: uuid(),
    email: faker.internet.email(),
    active: true,
    phoneNumber: '11943956693',
    name: faker.word.sample(),
    password: hashSync(faker.word.sample(), 12),
    gitHubId: faker.word.sample(),
    googleId: faker.word.sample(),
    verificationCode: faker.word.sample(),
    role: 'CLIENT',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuid(),
    email: faker.internet.email(),
    active: true,
    phoneNumber: '11943956694',
    name: faker.word.sample(),
    password: hashSync(faker.word.sample(), 12),
    gitHubId: faker.word.sample(),
    googleId: faker.word.sample(),
    verificationCode: faker.word.sample(),
    role: 'CLIENT',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const queryUserById: User = {
  id: '598641f1-1b95-45c0-a11a-37958de2b63c',
  email: faker.internet.email(),
  active: true,
  name: faker.word.sample(),
  phoneNumber: '11943956694',
  password: hashSync(faker.word.sample(), 12),
  gitHubId: faker.word.sample(),
  googleId: faker.word.sample(),
  verificationCode: faker.word.sample(),
  role: 'CLIENT',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const selectMock = {
  id: true,
  email: true,
  active: true,
  name: true,
  phoneNumber: true,
};
