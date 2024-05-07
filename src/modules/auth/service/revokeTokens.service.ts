import { db } from '../../../config';

export const revokeTokens = (userId: string) => {
  return db.refreshToken.updateMany({
    where: { userId },
    data: { revoked: true },
  });
};
