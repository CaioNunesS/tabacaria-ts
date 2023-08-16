import { Request, Response } from 'express'
import { resolve } from 'path'
import { existsSync } from 'fs'
import { throwError } from '../../utils/index'

import { env } from '../../env'

import { deleteFile, fileUploadPhoto } from './fileUpload.service'

export const fileUpload = async (req: Request, res: Response) => {
  const { productId } = req.params
  if (req.file) {
    const { filename }: Express.Multer.File = req.file

    const file = `${env.URL_IMAGE}/${filename}`

    await fileUploadPhoto({ file, productId, filename })
    return res
      .status(201)
      .json({ message: 'Atualizado com sucesso', data: req.file.filename })
  }
}

export const excludeProductImage = async (req: Request, res: Response) => {
  const { imageName } = req.params
  await deleteFile(imageName)

  return res.json({ message: 'Imagem deletada com sucesso' })
}

export const viewImage = async (req: Request, res: Response) => {
  const { imageName } = req.params
  const imagePath = resolve('uploads', imageName)

  if (!existsSync(imagePath)) throwError('Imagem não encontrada', 404)

  return res.sendFile(imagePath)
}
