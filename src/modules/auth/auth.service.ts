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
} from '../user/user.service';

type IAddRefreshTokenToWriteList = {
  jwtId: string;
  refreshToken: string;
  userId: string;
};

type IRegister = {
  email: string;
  password: string;
  name: string;
  gitHubId?: string;
};

type IRefreshToken = {
  refreshToken: string;
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

export const register = async ({
  email,
  password,
  name,
  gitHubId,
}: IRegister) => {
  try {
    const userEmail = await findUserByEmail(email);

    if (userEmail) throwError('Email já cadastrado', httpStatus.BAD_REQUEST);

    const user = await createUser({ email, password, name, gitHubId });

    if (user) {
      return await returnResponse(user);
    }
  } catch (error) {
    throwError('Erro ao cadastrar usuário', httpStatus.BAD_REQUEST);
  }
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
