import { validate, asyncWrapper } from './../../middleware/index';
import { Router } from 'express';
import { create } from './sms/sms.controller';
import { sendMailWelcome } from './email/email.controller';
import { smsSchema } from './sms/sms.schema';
import { sendMailSchema } from './email/email.schema';

const notificationRoutes = Router();
notificationRoutes.post('/send-sms', validate(smsSchema), asyncWrapper(create));
notificationRoutes.post(
  '/send-email',
  validate(sendMailSchema),
  asyncWrapper(sendMailWelcome)
);

export default notificationRoutes;
