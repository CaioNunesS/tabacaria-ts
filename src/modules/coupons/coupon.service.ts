import { Coupons } from '@prisma/client';
import { db } from '../../config/index';
import { throwError } from '../../utils/index';

type IcreateCoupon = {
  title: string;
  description: string;
  value: string;
};

export const createCoupon = async ({
  title,
  description,
  value,
}: IcreateCoupon) => {
  const getCoupon = await findCouponByTitle(title);
  if (getCoupon) throwError('Coupon já cadastrado', 409);

  const result = await db.coupons.create({
    data: { title, description, value },
  });
  return result;
};

export const findCouponByTitle = async <Key extends keyof Coupons>(
  title: string,
  keys: Key[] = [
    'id',
    'title',
    'description',
    'value',
    'createdAt',
    'updatedAt',
    'revoked',
  ] as Key[]
): Promise<Pick<Coupons, Key> | undefined> => {
  const result = await db.coupons.findFirst({
    where: { title },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });

  return result as Pick<Coupons, Key>;
};

export const findAllCoupons = async <Key extends keyof Coupons>(
  filter: {
    id?: string;
    title?: string;
    description?: string;
    value?: string;
    createdAt?: Date;
    updatedAt?: Date;
    revoked?: boolean;
  },
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'title',
    'description',
    'value',
    'createdAt',
    'updatedAt',
    'revoked',
  ] as Key[]
): Promise<Pick<Coupons, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';

  const result = await db.coupons.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });

  return result as Pick<Coupons, Key>[];
};

export const findCouponById = async <Key extends keyof Coupons>(
  couponId: string | undefined,
  keys: Key[] = [
    'id',
    'title',
    'description',
    'value',
    'createdAt',
    'updatedAt',
    'revoked',
  ] as Key[]
): Promise<Pick<Coupons, Key> | undefined> => {
  if (couponId) {
    const result = await db.coupons.findUnique({
      where: { id: couponId },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    });
    // console.log('result', result)

    if (!result) throwError('Coupon não encontrado', 404);
    return result as Pick<Coupons, Key>;
  }
};

export const revokeCoupon = async (
  id: string
): Promise<Coupons | undefined | null> => {
  await findCouponById(id);

  if (!id) return null;

  return db.coupons.update({
    where: { id },
    data: { revoked: true },
  });
};

export const verifyUserCoupon = async (userId: string, couponsId: string) => {
  if (couponsId) {
    const userUseCoupon = await db.userCoupons.findMany({
      where: {
        OR: [
          { userId, couponsId },
          { userId: couponsId, couponsId: userId },
        ],
      },
    });
    if (userUseCoupon.length > 5) {
      await revokeCoupon(couponsId);
      throwError('Limite de uso do cupom atingido', 400);
    }

    await db.userCoupons.create({
      data: { userId, couponsId },
    });
  }
};
