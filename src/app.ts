import 'dotenv/config'
import 'express-async-errors'
import express, { json, urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { notFound, erroHandler } from './middleware/index'

import routes from './routes'
// import swaggerUi from '@fastify/swagger-ui'
// import swaggerFile from '../'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/api/v1', routes)

app.use(notFound)
app.use(erroHandler)

export default app
