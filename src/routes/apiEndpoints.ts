import { Router } from 'express';
import { loginRouter } from './without_auth/login.router';
import { registerRouter } from './without_auth/register.router';
import { clustersRouter } from './with_auth/clusters.router';
import { driversRouter } from './with_auth/drivers.router';
import { orderRouter } from './with_auth/orders.router';
import { scanRouter } from './with_auth/scan.router';

export const apiEndpoints = Router();

apiEndpoints.use('/login', loginRouter);
apiEndpoints.use('/register', registerRouter);

apiEndpoints.use('/order', orderRouter);
apiEndpoints.use('/scan', scanRouter);
apiEndpoints.use('/drivers', driversRouter);
apiEndpoints.use('/clusters', clustersRouter);
