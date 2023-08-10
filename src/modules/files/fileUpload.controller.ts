import { Request, Response } from 'express'
import { resolve } from 'path'
import { existsSync } from 'fs'
import { throwError } from '../../utils/index'

import { deleteFile, fileUploadPhoto } from './fileUpload.service'

export const fileUpload = async (req: Request, res: Response) => {
  const { productId } = req.params
  if (req.file) {
    const { filename }: Express.Multer.File = req.file

    const file = `${process.env.URL_IMAGE}/${filename}`

    await fileUploadPhoto({ file, productId })
    return res
      .status(201)
      .json({ message: 'Upload successfully', data: req.file.filename })
  }
}

export const excludeProductImage = async (req: Request, res: Response) => {
  const { imageName } = req.params
  await deleteFile(imageName)

  return res.json({ message: 'Image deleted successfully' })
}

export const viewImage = async (req: Request, res: Response) => {
  const { imageName } = req.params
  const imagePath = resolve('uploads', imageName)

  if (!existsSync(imagePath)) throwError('Imagem não encontrada', 404)

  return res.sendFile(imagePath)
}
