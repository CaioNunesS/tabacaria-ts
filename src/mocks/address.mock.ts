import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import { Address } from '@prisma/client';
import { ICreateAddress } from '../modules/address/address.service';

export const createDataMock: ICreateAddress = {
  id: uuid(),
  street: faker.location.street(),
  city: faker.location.city(),
  neighborhood: faker.location.city(),
  state: faker.location.state(),
  number: faker.location.buildingNumber(),
  zipCode: '06413010',
  userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
  active: true,
  AdditionalData: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const queryAddressById: Address = {
  id: '598641f1-1b95-45c0-a11a-37958de2b63c',
  street: faker.location.street(),
  city: faker.location.city(),
  neighborhood: faker.location.city(),
  state: faker.location.state(),
  number: faker.location.buildingNumber(),
  zipCode: '06413010',
  userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
  active: true,
  AdditionalData: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const selectMock = {
  id: true,
  street: true,
  city: true,
  neighborhood: true,
  state: true,
  number: true,
  zipCode: true,
  userId: true,
  active: true,
  AdditionalData: true,
  createdAt: true,
  updatedAt: true,
};

export const addresses = [
  {
    id: '598641f1-1b95-45c0-a11a-37958de2b63c',
    street: faker.location.street(),
    city: faker.location.city(),
    neighborhood: faker.location.city(),
    state: faker.location.state(),
    number: faker.location.buildingNumber(),
    zipCode: '06413010',
    userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
    active: true,
    AdditionalData: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'b0280baf-d653-49d7-affd-8def477c94fc',
    street: faker.location.street(),
    city: faker.location.city(),
    neighborhood: faker.location.city(),
    state: faker.location.state(),
    number: faker.location.buildingNumber(),
    zipCode: '06413011',
    userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
    active: true,
    AdditionalData: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
