import { Router } from 'express';
import { putScan } from '../../controller/scan.controller';
import { authMiddleware } from '../../auth/auth-middleware';

export const scanRouter = Router();

scanRouter.put('/', authMiddleware, putScan);
