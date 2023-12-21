import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as User from '../updateUser.service';
import { queryUserById } from '../../../../mocks/user.mock';

export const prismaMock = {
  user: {
    create: vi.fn(),
    findMany: vi.fn(),
    findById: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
  },
};

describe('when update user', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.spyOn(User, 'updateUser').mockImplementation(async () => {
    const user = await prismaMock.user.update({
      where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
      data: { active: false },
    });
    return user;
  });
  prismaMock.user.findById.mockResolvedValue(queryUserById);

  it('updates an user', async () => {
    const updateBody = { active: false };
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
    const updateBody = { active: false };

    prismaMock.user.update.mockRejectedValue(new Error('User not found'));

    await expect(
      // eslint-disable-next-line prettier/prettier
        User.updateUser('598641f1-1b95-45c0-a11a-37958de2b63c', updateBody)).rejects.toThrow(new Error('User not found'))
  });
});
