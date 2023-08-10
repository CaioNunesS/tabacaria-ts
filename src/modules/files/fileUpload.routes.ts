import { Router } from 'express'
import {
  asyncWrapper,
  diskStorage,
  imageFileFilter as imageFilter,
  limits,
  isAuthenticated,
} from '../../middleware/index'
import multer from 'multer'
import {
  fileUpload,
  excludeProductImage,
  viewImage,
} from './fileUpload.controller'

const fileRoutes = Router()

fileRoutes.patch(
  '/:productId',
  multer({
    storage: diskStorage,
    limits,
    fileFilter: imageFilter,
  }).single('file'),
  asyncWrapper(fileUpload),
)
fileRoutes.get('/:imageName', asyncWrapper(viewImage))
fileRoutes.delete('/:imageName', asyncWrapper(excludeProductImage))

export default fileRoutes
