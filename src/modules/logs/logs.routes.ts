import { Router } from 'express'
import { getAll } from './logs.controller'

const logRoutes = Router()
logRoutes.get('/', getAll)

export default logRoutes
