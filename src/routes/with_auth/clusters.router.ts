import { Router } from 'express';
import {
  getClusters,
  postClusters,
  putClusters,
  deleteClusters
} from '../../controller/clusters.controller';
import { authMiddleware } from '../../auth/auth-middleware';

export const clustersRouter = Router();

clustersRouter.get('/', authMiddleware, getClusters);
clustersRouter.post('/', authMiddleware, postClusters);
clustersRouter.put('/', authMiddleware, putClusters);
clustersRouter.delete('/', authMiddleware, deleteClusters);
