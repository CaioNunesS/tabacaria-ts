import { Router } from 'express'
import { create, login } from './auth.controller'

const authRoutes = Router()

authRoutes.post('/', create)
authRoutes.post('/login', login)

export default authRoutes
