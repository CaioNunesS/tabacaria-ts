import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as User from '../createUser.service';
import { createDataMock } from '../../../../mocks/user.mock';

export const prismaMock = {
  user: {
    create: vi.fn(),
  },
};

describe('when creating a User', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
    expect(result).toHaveProperty('phoneNumber');
    expect(result).toEqual(createDataMock);
  });

  it('return an error if create request fails', async () => {
    prismaMock.user.create.mockRejectedValue(new Error('create user failed'));

    await expect(User.createUser(createDataMock)).rejects.toThrow(
      'create user failed'
    );
  });
});
