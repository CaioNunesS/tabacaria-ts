import { existsSync, unlinkSync } from 'fs'
import { resolve } from 'path'
import { db } from '../../config/index'
import { throwError } from '../../utils'
import {
  findProductByImageName,
  updateProduct,
} from '../products/product.service'

type IfileUpload = {
  file: string
  productId: string
}

export const fileUploadPhoto = async ({ file, productId }: IfileUpload) => {
  if (!file) throwError('Por favor, selecione um arquivo', 422)
  const result = await db.products.update({
    where: {
      id: productId,
    },
    data: {
      photo: file,
    },
  })
  return result
}

export const deleteFile = async (imageName: string) => {
  const imagePath = resolve('uploads', imageName)

  if (!existsSync(imagePath)) throwError('Imagem não encontrada', 422)

  const productImage = await findProductByImageName(imageName)
  if (productImage) {
    await updateProduct(productImage.id, { photo: null })
  }

  return unlinkSync(imagePath)
}
