import { Router } from 'express';
import { authMiddleware } from '../../auth/auth-middleware';
import {
  deleteDrivers,
  getDrivers,
  postDrivers,
  putDrivers
} from '../../controller/drivers.controller';

export const driversRouter = Router();

driversRouter.get('/', authMiddleware, getDrivers);
driversRouter.post('/', authMiddleware, postDrivers);
driversRouter.put('/', authMiddleware, putDrivers);
driversRouter.delete('/', authMiddleware, deleteDrivers);
