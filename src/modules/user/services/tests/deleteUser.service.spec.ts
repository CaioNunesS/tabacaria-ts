import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as User from '../deleteUser.service';
import { queryUserById } from '../../../../mocks/user.mock';

export const prismaMock = {
  user: {
    findById: vi.fn(),
    delete: vi.fn(),
  },
};

describe('when delete User', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
