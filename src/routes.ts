import authRoutes from '../src/modules/auth/auth.routes'
import { Router } from 'express'
import userRoutes from './modules/user/user.routes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/user', userRoutes)

export default routes
