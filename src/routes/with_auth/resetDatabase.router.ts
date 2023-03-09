import { Router } from 'express';
import { getResetDatabase } from '../../controller/resetDatabase.controller';
import { authMiddleware } from '../../auth/auth-middleware';

export const resetDatabaseRouter = Router();

resetDatabaseRouter.get('/', authMiddleware, getResetDatabase);
