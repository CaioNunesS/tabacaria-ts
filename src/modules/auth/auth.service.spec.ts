import * as Auth from './auth.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createDataMock } from '../../mocks/auth.mock';

export const prismaMock = {
  auth: {
    create: vi.fn(),
  },
};

describe('Auth Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when registering a new user', () => {
    it('should return the user with correct properties', async () => {
      vi.spyOn(Auth, 'register').mockImplementation(async () => {
        const user = await prismaMock.auth.create({
          data: createDataMock,
        });
        return user;
      });
      prismaMock.auth.create.mockResolvedValue(createDataMock);
      const result = await Auth.register(createDataMock);

      expect(prismaMock.auth.create).toHaveBeenCalledWith({
        data: createDataMock,
      });
      expect(result).toEqual(createDataMock);
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('password');
      expect(result).toHaveProperty('phoneNumber');
    });

    it('should return an error if create request fails', async () => {
      prismaMock.auth.create.mockRejectedValue(new Error('create user failed'));

      await expect(Auth.register(createDataMock)).rejects.toThrow(
        'create user failed'
      );
    });
  });
});
