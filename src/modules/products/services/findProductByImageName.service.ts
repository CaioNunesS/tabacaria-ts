import { Products } from '@prisma/client';
import { db } from '../../../config';

export const findProductByImageName = async <Key extends keyof Products>(
  imageName: string,
  keys: Key[] = [
    'id',
    'active',
    'name',
    'price',
    'description',
    'createdAt',
    'updatedAt',
  ] as Key[]
): Promise<Pick<Products, Key> | undefined> => {
  const result = await db.imageProducts.findUnique({
    where: { ImageName: imageName },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });
  return result as unknown as Pick<Products, Key> | undefined;
};
