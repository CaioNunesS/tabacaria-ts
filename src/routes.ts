import authRoutes from './modules/auth/auth.routes'
import { Router } from 'express'
import userRoutes from './modules/user/user.routes'
import productRoutes from './modules/products/product.routes'
import fileRoutes from './modules/files/fileUpload.routes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/user', userRoutes)
routes.use('/product', productRoutes)
routes.use('/file', fileRoutes)

export default routes
