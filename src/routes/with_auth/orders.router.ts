import { Router } from 'express';
import { authMiddleware } from '../../auth/auth-middleware';
import {
  deleteOrder,
  getOrder,
  postOrder,
  putOrder
} from '../../controller/orders.controller';

export const orderRouter = Router();

orderRouter.get('/', authMiddleware, getOrder);
orderRouter.get('/:driver', authMiddleware, getOrder);

orderRouter.post('/', authMiddleware, postOrder);
orderRouter.put('/', authMiddleware, putOrder);
orderRouter.delete('/', authMiddleware, deleteOrder);
