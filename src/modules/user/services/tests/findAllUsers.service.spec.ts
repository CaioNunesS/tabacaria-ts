import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as User from '../findAllUsers.service';
import { queryUserMock, selectMock } from '../../../../mocks/user.mock';

export const prismaMock = {
  user: {
    create: vi.fn(),
    findMany: vi.fn(),
    findById: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
  },
};

describe('when query users', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.spyOn(User, 'findAllUsers').mockImplementation(async () => {
    const user = await prismaMock.user.findMany({
      where: { active: true },
      select: selectMock,
      skip: 0,
      take: 10,
      orderBy: undefined,
    });

    return user;
  });
  it('querys user with default options', async () => {
    const filter = { active: true };
    const keys: (
      | 'id'
      | 'name'
      | 'email'
      | 'active'
      | 'phoneNumber'
      | 'createdAt'
      | 'updatedAt'
    )[] = [
      'id',
      'name',
      'email',
      'active',
      'phoneNumber',
      'createdAt',
      'updatedAt',
    ];
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
    const filter = { active: true };
    const keys: (
      | 'id'
      | 'name'
      | 'email'
      | 'active'
      | 'phoneNumber'
      | 'createdAt'
      | 'updatedAt'
    )[] = [
      'id',
      'name',
      'email',
      'active',
      'createdAt',
      'phoneNumber',
      'updatedAt',
    ];
    prismaMock.user.findMany.mockResolvedValue([]);

    const result = await User.findAllUsers(filter, {}, keys);
    expect(result).toEqual([]);
  });

  it('corretly apply the limit and page options', async () => {
    const filter = { active: true };
    const options = { limit: 5, page: 2 };
    const keys: (
      | 'id'
      | 'name'
      | 'email'
      | 'phoneNumber'
      | 'active'
      | 'createdAt'
      | 'updatedAt'
    )[] = [
      'id',
      'name',
      'email',
      'active',
      'phoneNumber',
      'createdAt',
      'updatedAt',
    ];
    vi.spyOn(User, 'findAllUsers').mockImplementation(async () => {
      const user = await prismaMock.user.findMany({
        where: { active: true },
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
