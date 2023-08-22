import { faker } from '@faker-js/faker';
import { ITwilio } from '../config';

export const sendSmsMock: ITwilio = {
  phone: '+5511943956693',
  message: faker.animal.cat(),
};
