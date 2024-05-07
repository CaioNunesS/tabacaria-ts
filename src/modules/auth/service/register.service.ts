import httpStatus from 'http-status';
import { throwError } from '../../../utils/index';

import { createUser, findUserByEmail } from '../../user/services/index';
import { returnResponse } from './returnResponse.service';

export type IRegister = {
  id?: string;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  gitHubId?: string;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const register = async ({
  email,
  password,
  name,
  phoneNumber,
  gitHubId,
  googleId,
}: IRegister) => {
  const userEmail = await findUserByEmail(email);

  if (userEmail) throwError('Email já cadastrado', httpStatus.BAD_REQUEST);

  const user = await createUser({
    email,
    password,
    name,
    phoneNumber,
    gitHubId,
    googleId,
  });
  console.log(user);

  if (user) {
    return await returnResponse(user);
  }
};
