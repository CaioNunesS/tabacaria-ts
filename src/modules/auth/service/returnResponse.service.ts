import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { generateTokens } from '../../../utils';
import { addRefreshTokenToWriteList } from './index';

export const returnResponse = async (user: User) => {
  const jwtId = uuidv4();

  const { accessToken, refreshToken } = generateTokens(user, jwtId);
  if (refreshToken) {
    await addRefreshTokenToWriteList({
      jwtId,
      refreshToken,
      userId: user.id,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
};
