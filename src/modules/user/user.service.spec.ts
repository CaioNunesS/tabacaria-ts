import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as User from './user.service';
import {
  createDataMock,
  queryUserMock,
  selectMock,
  queryUserById,
} from '../../mocks/user.mock';

export const prismaMock = {
  user: {
    create: vi.fn(),
    findMany: vi.fn(),
    findById: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
  },
};

describe('User Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when creating a User', () => {
    vi.spyOn(User, 'createUser').mockImplementation(async () => {
      const user = await prismaMock.user.create({ data: createDataMock });
      return user;
    });
    it('returns the user with correct properties', async () => {
      prismaMock.user.create.mockResolvedValue(createDataMock);
      const result = await User.createUser(createDataMock);

      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: createDataMock,
      });
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('password');
      expect(result).toHaveProperty('name');
      expect(result).toEqual(createDataMock);
    });

    it('return an error if create request fails', async () => {
      prismaMock.user.create.mockRejectedValue(new Error('create user failed'));

      await expect(User.createUser(createDataMock)).rejects.toThrow(
        'create user failed'
      );
    });
  });

  describe('when query an user', () => {
    vi.spyOn(User, 'findAllUsers').mockImplementation(async () => {
      const user = await prismaMock.user.findMany({
        where: { ativo: true },
        select: selectMock,
        skip: 0,
        take: 10,
        orderBy: undefined,
      });

      return user;
    });
    it('querys user with default options', async () => {
      const filter = { ativo: true };
      const keys: (
        | 'id'
        | 'name'
        | 'email'
        | 'ativo'
        | 'createdAt'
        | 'updatedAt'
      )[] = ['id', 'name', 'email', 'ativo', 'createdAt', 'updatedAt'];
      prismaMock.user.findMany.mockResolvedValue(queryUserMock);

      const result = await User.findAllUsers(filter, {}, keys);

      expect(result).toEqual(queryUserMock);
      expect(prismaMock.user.findMany).toHaveBeenCalledWith({
        where: filter,
        select: selectMock,
        skip: 0,
        take: 10,
        orderBy: undefined,
      });
    });

    it('return an empty array if no user is found', async () => {
      const filter = { ativo: true };
      const keys: (
        | 'id'
        | 'name'
        | 'email'
        | 'ativo'
        | 'createdAt'
        | 'updatedAt'
      )[] = ['id', 'name', 'email', 'ativo', 'createdAt', 'updatedAt'];
      prismaMock.user.findMany.mockResolvedValue([]);

      const result = await User.findAllUsers(filter, {}, keys);
      expect(result).toEqual([]);
    });

    it('corretly apply the limit and page options', async () => {
      const filter = { ativo: true };
      const options = { limit: 5, page: 2 };
      const keys: (
        | 'id'
        | 'name'
        | 'email'
        | 'ativo'
        | 'createdAt'
        | 'updatedAt'
      )[] = ['id', 'name', 'email', 'ativo', 'createdAt', 'updatedAt'];
      vi.spyOn(User, 'findAllUsers').mockImplementation(async () => {
        const user = await prismaMock.user.findMany({
          where: { ativo: true },
          select: selectMock,
          skip: 5,
          take: options.limit,
          orderBy: undefined,
        });

        return user;
      });

      await User.findAllUsers(filter, options, keys);
      expect(prismaMock.user.findMany).toHaveBeenCalledWith({
        where: filter,
        select: selectMock,
        skip: 5,
        take: options.limit,
        orderBy: undefined,
      });
    });
  });

  describe('when get user by id', () => {
    vi.spyOn(User, 'findUserById').mockImplementation(async () => {
      const user = await prismaMock.user.findById({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
        select: selectMock,
      });
      return user;
    });
    prismaMock.user.findById.mockResolvedValue(queryUserById);
    it('gets an user by id', async () => {
      const result = await User.findUserById(
        '598641f1-1b95-45c0-a11a-37958de2b63c'
      );

      expect(result).toEqual(queryUserById);
      expect(prismaMock.user.findById).toHaveBeenCalledWith({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
        select: selectMock,
      });
    });

    it('should throw an error if no user is found', async () => {
      prismaMock.user.findById.mockRejectedValue(new Error('User not found'));

      await expect(
        User.findUserById('598641f1-1b95-45c0-a11a-37958de2b63e')
      ).rejects.toThrow('User not found');
    });
  });

  describe('when delete User', () => {
    vi.spyOn(User, 'deleteUser').mockImplementation(async () => {
      const user = await prismaMock.user.delete({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
      });
      return user;
    });
    prismaMock.user.delete.mockResolvedValue(queryUserById);

    it('delete an user', async () => {
      await User.deleteUser('598641f1-1b95-45c0-a11a-37958de2b63c');
      expect(prismaMock.user.delete).toHaveBeenCalledWith({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
      });
    });

    it('throw an error if user not found', async () => {
      prismaMock.user.findById.mockResolvedValue(null);
      prismaMock.user.delete.mockRejectedValue(new Error('user not found'));
      // eslint-disable-next-line prettier/prettier
      await expect(User.deleteUser('598641f1-1b95-45c0-a11a-37958de2b635')).rejects.toThrow(new Error('user not found'))
    });
  });

  describe('when update user', () => {
    vi.spyOn(User, 'updateUser').mockImplementation(async () => {
      const user = await prismaMock.user.update({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
        data: { ativo: false },
      });
      return user;
    });
    prismaMock.user.findById.mockResolvedValue(queryUserById);

    it('updates an user', async () => {
      const updateBody = { ativo: false };
      prismaMock.user.update.mockResolvedValue({
        ...queryUserById,
        ...updateBody,
      });
      prismaMock.user.findById.mockResolvedValue(queryUserById);

      const result = await User.updateUser(
        '598641f1-1b95-45c0-a11a-37958de2b63c',
        updateBody
      );

      expect(result).toEqual({ ...queryUserById, ...updateBody });
    });

    it('throws an error if the user is not found', async () => {
      const updateBody = { ativo: false };

      prismaMock.user.update.mockRejectedValue(new Error('User not found'));

      await expect(
        // eslint-disable-next-line prettier/prettier
        User.updateUser('598641f1-1b95-45c0-a11a-37958de2b63c', updateBody)).rejects.toThrow(new Error('User not found'))
    });
  });
});
