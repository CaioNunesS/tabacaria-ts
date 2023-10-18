import { db } from '../../config/index';
import { hashSync } from 'bcrypt';
import { throwError } from '../../utils/index';
import { User, Prisma, Role } from '@prisma/client';
import httpStatus from 'http-status';

export type IuserCreate = {
  id?: string;
  active?: boolean;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  gitHubId?: string;
  googleId?: string;
  role?: Role;
  verificationCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type IupdateUserResponse = {
  id: string;
  active: boolean;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export const createUser = async (user: IuserCreate) => {
  const { phoneNumber } = user;
  const existPhoneNumber = await findUserByPhoneNumber(phoneNumber);
  if (existPhoneNumber) {
    throwError('Número de telefone já cadastrado', httpStatus.BAD_REQUEST);
  }

  user.password = hashSync(user.password, 12);
  return await db.user.create({
    data: user,
  });
};

export const findAllUsers = async <Key extends keyof User>(
  filter: {
    id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    active?: boolean;
  },
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'name',
    'active',
    'email',
    'phoneNumber',
    'role',
    'createdAt',
    'updatedAt',
  ] as Key[]
): Promise<Pick<User, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';

  const customer = await db.user.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
  if (customer.length === 0)
    throwError('Usuário não encontrado.', httpStatus.NOT_FOUND);

  return customer as Pick<User, Key>[];
};

export const findUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        active: true,
        email: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        gitHubId: true,
        googleId: true,
        password: true,
        verificationCode: true,
      },
    });

    return user;
  } catch (error) {
    throwError('Usuário não encontrado.', httpStatus.NOT_FOUND);
  }
};

export const findUserById = async <Key extends keyof User>(
  id: string,
  keys: Key[] = [
    'id',
    'name',
    'active',
    'email',
    'phoneNumber',
    'role',
    'createdAt',
    'updatedAt',
  ] as Key[]
): Promise<Pick<User, Key> | undefined> => {
  try {
    const getUser = await db.user.findUnique({
      where: { id },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    });

    if (!getUser) throwError('Usuário não encontrado.', httpStatus.NOT_FOUND);

    return getUser as Pick<User, Key>;
  } catch (error) {
    throwError('Usuário não encontrado.', httpStatus.NOT_FOUND);
  }
};

export const findUserByGoogleId = async <Key extends keyof User>(
  googleId: string,
  keys: Key[] = [
    'id',
    'name',
    'active',
    'email',
    'phoneNumber',
    'role',
    'googleId',
    'createdAt',
    'updatedAt',
  ] as Key[]
): Promise<Pick<User, Key> | undefined> => {
  const result = await db.user.findUnique({
    where: { id: googleId },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });
  if (!result) throwError('Usuário não encontrado', httpStatus.NOT_FOUND);

  return result as Pick<User, Key>;
};

export const updateUser = async <Key extends keyof User>(
  userId: string,
  updateBody: Prisma.UserUpdateInput,
  keys: Key[] = [
    'id',
    'name',
    'active',
    'email',
    'phoneNumber',
    'googleId',
    'verificationCode',
    'role',
    'createdAt',
    'updatedAt',
  ] as Key[]
): Promise<IupdateUserResponse | null> => {
  const user = await findUserById(userId, [
    'id',
    'name',
    'active',
    'email',
    'phoneNumber',
    'googleId',
    'verificationCode',
    'role',
    'createdAt',
    'updatedAt',
  ]);

  if (!user) throwError('Usuário não encontrado', httpStatus.NOT_FOUND);
  const updatedUser = await db.user.update({
    where: { id: userId },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });
  return updatedUser as IupdateUserResponse | null;
};

export const deleteUser = async (userId: string): Promise<User> => {
  const user = await findUserById(userId, ['id']);

  if (!user) throwError('Usuário não encontrado', httpStatus.NOT_FOUND);

  return await db.user.delete({ where: { id: userId } });
};

export const findUserByPhoneNumber = async (phoneNumber: string) => {
  try {
    const user = await db.user.findFirst({
      where: { phoneNumber: phoneNumber },
      select: {
        id: true,
        name: true,
        active: true,
        email: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        gitHubId: true,
        googleId: true,
        password: false,
        verificationCode: true,
      },
    });
    return user;
  } catch (error) {
    throwError('Usuário não encontrado.', httpStatus.NOT_FOUND);
  }
};
