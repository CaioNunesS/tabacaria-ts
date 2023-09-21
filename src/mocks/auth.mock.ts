import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import { IRegister } from '../modules/auth/auth.service';

export const createDataMock: IRegister = {
  id: uuid(),
  email: faker.internet.email(),
  password: faker.word.sample(),
  name: faker.word.sample(),
  gitHubId: faker.word.sample(),
  googleId: faker.word.sample(),
  createdAt: new Date(),
  updatedAt: new Date(),
};
