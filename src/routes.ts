import authRoutes from './modules/auth/auth.routes';
import { Router } from 'express';
import userRoutes from './modules/user/user.routes';
import productRoutes from './modules/products/product.routes';
import fileRoutes from './modules/files/fileUpload.routes';
import couponRoutes from './modules/coupons/coupon.routes';
import orderRoutes from './modules/orders/order.routes';
import logRoutes from './modules/logs/logs.routes';
import notificationRoutes from './modules/notifications/notification.routes';
import addressRoutes from './modules/address/address.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/product', productRoutes);
routes.use('/file', fileRoutes);
routes.use('/coupon', couponRoutes);
routes.use('/order', orderRoutes);
routes.use('/log', logRoutes);
routes.use('/notification', notificationRoutes);
routes.use('/address', addressRoutes);

export default routes;
