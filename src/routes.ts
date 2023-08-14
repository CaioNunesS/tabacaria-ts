import authRoutes from './modules/auth/auth.routes'
import { Router } from 'express'
import userRoutes from './modules/user/user.routes'
import productRoutes from './modules/products/product.routes'
import fileRoutes from './modules/files/fileUpload.routes'
import couponRoutes from './modules/coupons/coupon.routes'
import orderRoutes from './modules/orders/order.routes'
import logRoutes from './modules/logs/logs.routes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/user', userRoutes)
routes.use('/product', productRoutes)
routes.use('/file', fileRoutes)
routes.use('/coupon', couponRoutes)
routes.use('/order', orderRoutes)
routes.use('/log', logRoutes)

export default routes
