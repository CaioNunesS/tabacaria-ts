import 'dotenv/config';
import 'express-async-errors';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { notFound, erroHandler, logMiddleware } from './middleware/index';
import passport from 'passport';

import { env } from './env';

require('./middleware/passport');
import session from 'express-session';

import routes from './routes';
// import swaggerUi from '@fastify/swagger-ui'
// import swaggerFile from '../'

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(logMiddleware);
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 1000,
    },
  })
);

app.use(passport.session());
app.use(passport.initialize());

app.use('/api/v1', routes);

app.use(notFound);
app.use(erroHandler);
// tokenValidation()

export default app;
