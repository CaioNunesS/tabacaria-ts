import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as User from '../findUserById.service';
import { queryUserById, selectMock } from '../../../../mocks/user.mock';

export const prismaMock = {
  user: {
    findById: vi.fn(),
  },
};

describe('when get user by id', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
