import { Router } from 'express';
import { getInitDatabase } from '../../controller/initDatabase.controller';
import { authMiddleware } from '../../auth/auth-middleware';

export const initDatabaseRouter = Router();

initDatabaseRouter.get('/', authMiddleware, getInitDatabase);
