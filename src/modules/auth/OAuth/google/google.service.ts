import { findUserByEmail, updateUser } from '../../../user/user.service';
import { db } from '../../../../config/index';

type IregisterWithGoogle = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  provider?: string;
};

export const registerWithGoogle = async ({
  id,
  firstName,
  lastName,
  email,
}: IregisterWithGoogle) => {
  const getProfile = await findUserByEmail(email);
  if (getProfile) {
    const user = {
      googleId: id,
      name: `${firstName} ${lastName}`,
    };
    await updateUser(getProfile.id, user);
  }

  const userBody = {
    googleId: id,
    name: `${firstName} ${lastName}`,
    email: email,
  };
  const result = await db.user.create({
    data: userBody,
  });

  return result;
};
