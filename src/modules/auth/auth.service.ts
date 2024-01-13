import { v4 as uuidv4 } from 'uuid';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { User } from '@prisma/client';

import { db } from '../../config/index';
import {
  hashToken,
  throwError,
  generateTokens,
  comparePassword,
} from '../../utils/index';

import { env } from '../../env';

import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByPhoneNumber,
  updateUser,
} from '../user/services/index';
import { validateChangePassword } from './auth.schema';
import { ZodError } from 'zod';
import { generateRandomCode } from '../../utils/generateRandomCode';
import { sendMail } from '../notifications/email/email.service';
import { generateVerificationEmailHTML } from '../../templates/email/verificationCode';
import { verificationCodeSms } from '../../templates/sms/verificationCode';
import { sendSms } from '../notifications/sms/sms.service';

type IAddRefreshTokenToWriteList = {
  jwtId: string;
  refreshToken: string;
  userId: string;
};

export type IRegister = {
  id?: string;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  gitHubId?: string;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IChangePassword {
  newPassword: string;
  confirmNewPassword: string;
}

type IRefreshToken = {
  refreshToken: string;
};

export const register = async ({
  email,
  password,
  name,
  phoneNumber,
  gitHubId,
  googleId,
}: IRegister) => {
  const userEmail = await findUserByEmail(email);

  if (userEmail) throwError('Email já cadastrado', httpStatus.BAD_REQUEST);

  const user = await createUser({
    email,
    password,
    name,
    phoneNumber,
    gitHubId,
    googleId,
  });
  console.log(user);

  if (user) {
    return await returnResponse(user);
  }
};

export const addRefreshTokenToWriteList = ({
  jwtId,
  refreshToken,
  userId,
}: IAddRefreshTokenToWriteList) => {
  try {
    return db.refreshToken.create({
      data: {
        id: jwtId,
        hashedToken: hashToken(refreshToken),
        userId,
      },
    });
  } catch (error) {
    throwError('Erro para adicionar refreshToken', httpStatus.BAD_REQUEST);
  }
};

export const findRefreshTokenById = (id: string) => {
  try {
    return db.refreshToken.findUnique({
      where: { id },
    });
  } catch (error) {
    throwError('Erro para buscar refreshToken', httpStatus.BAD_REQUEST);
  }
};

export const deleteRefreshToken = (id: string) => {
  try {
    return db.refreshToken.update({
      where: { id },
      data: {
        revoked: true,
      },
    });
  } catch (error) {
    throwError('Erro para buscar refreshToken', httpStatus.BAD_REQUEST);
  }
};

export const revokeTokens = (userId: string) => {
  return db.refreshToken.updateMany({
    where: { userId },
    data: { revoked: true },
  });
};

export const authenticatedUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const getUser = await comparePassword(email, password);

    if (getUser) {
      return await returnResponse(getUser);
    }
  } catch (error) {
    throwError('Erro ao autenticar usuário', httpStatus.BAD_REQUEST);
  }
};

export const refreshToken = async ({ refreshToken }: IRefreshToken) => {
  try {
    if (!refreshToken)
      throwError('refreshToken não informado', httpStatus.BAD_REQUEST);

    const payload = jwt.verify(
      refreshToken,
      env.JWT_REFRESH_SECRET || 'afahfbhafhaf'
    ) as JwtPayload;

    const savedRefreshToken = await findRefreshTokenById(payload.jwtId);

    if (!savedRefreshToken || savedRefreshToken.revoked === true)
      throwError('refreshToken inválido', httpStatus.BAD_REQUEST);

    const hashedToken = hashToken(refreshToken);

    if (savedRefreshToken && hashedToken !== savedRefreshToken.hashedToken)
      throwError('refreshToken inválido', httpStatus.BAD_REQUEST);

    const user = await findUserById(payload.userId);

    if (!user) throwError('Usuário não encontrado', httpStatus.NOT_FOUND);
    if (savedRefreshToken) {
      await deleteRefreshToken(savedRefreshToken.id);
    }
    if (user) {
      return await returnResponse(user);
    }
  } catch (error) {
    throwError('Erro ao autenticar usuário', httpStatus.BAD_REQUEST);
  }
};

export const sendVerificationCode = async (email?: string, phone?: string) => {
  const code = generateRandomCode(6);
  try {
    if (email) {
      const getUser = await findUserByEmail(email);
      if (getUser) {
        const { id } = getUser;

        const emailBody = {
          to: email,
          subject: 'Código de verificação',
          html: generateVerificationEmailHTML(code),
        };
        await sendMail(emailBody);
        await updateUser(id, { verificationCode: code });
      }
    }
    if (phone) {
      const getUser = await findUserByPhoneNumber(phone);

      if (getUser && getUser !== null) {
        const { phoneNumber, id, name } = getUser;

        const message = await verificationCodeSms({ name, code });

        if (phoneNumber) {
          await sendSms({ message, phone: `+55${phoneNumber}` });
          await updateUser(id, { verificationCode: code });
        }
      } else {
        throwError(
          'Não foi possivel completar a açãooo',
          httpStatus.BAD_REQUEST
        );
      }
    }
  } catch (error) {
    throwError('Não foi possivel completar a ação', httpStatus.BAD_REQUEST);
  }
};

export const verifyCode = async (
  code: string,
  email?: string,
  phoneNumber?: string
) => {
  if (email) {
    const userData = await findUserByEmail(email);
    if (userData) {
      const { id, verificationCode } = userData;

      if (verificationCode !== code) {
        throwError('Código inválido', httpStatus.BAD_REQUEST);
      }

      await updateUser(id, { verificationCode: null });

      return 'okay';
    }
  }
  if (phoneNumber) {
    const userData = await findUserByPhoneNumber(phoneNumber);
    if (userData) {
      const { id, verificationCode } = userData;

      if (verificationCode !== code) {
        throwError('Código inválido', httpStatus.BAD_REQUEST);
      }

      await updateUser(id, { verificationCode: null });

      return 'okay';
    }
  }
};

export const changePasswordServ = async (
  id: string,
  changedPassword: IChangePassword
) => {
  try {
    validateChangePassword(changedPassword);
  } catch (error) {
    if (error instanceof ZodError) {
      throwError(error.message, httpStatus.BAD_REQUEST);
    }
    throwError('Erro no servidor', httpStatus.INTERNAL_SERVER_ERROR);
  }

  const { confirmNewPassword, newPassword } = changedPassword;
  if (newPassword !== confirmNewPassword) {
    throwError('As senhas não são iguais', httpStatus.BAD_REQUEST);
  }

  return await updateUser(id, { password: newPassword });
};

const returnResponse = async (user: User) => {
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
