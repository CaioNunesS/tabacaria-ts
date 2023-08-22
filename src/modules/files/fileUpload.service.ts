import { existsSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import { db } from '../../config/index';
import { throwError } from '../../utils';

type IfileUpload = {
  file: string;
  productId: string;
  filename: string;
};

export const fileUploadPhoto = async ({
  file,
  productId,
  filename,
}: IfileUpload) => {
  try {
    if (!file) throwError('Por favor, selecione um arquivo', 422);
    const result = await db.products.update({
      where: {
        id: productId,
      },
      data: {
        ImageProducts: { create: { ImageName: filename } },
      },
    });

    return result;
  } catch (error) {
    console.log('error ==>', error);
  }
};

export const deleteFile = async (imageName: string) => {
  const imagePath = resolve('uploads', imageName);

  if (!existsSync(imagePath)) throwError('Imagem não encontrada', 422);

  await db.imageProducts.delete({ where: { ImageName: imageName } });

  return unlinkSync(imagePath);
};
