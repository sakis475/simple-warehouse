import { Request, Response } from 'express';
import { ErrorCode } from '../error_handler/error-code';
import { ErrorException } from '../error_handler/error-exception';

export async function getInitDatabase(req: Request, res: Response, next: any) {
  // create collection of drivers, clusters, orders
  // if a collection already exist delete it and recreate it
  try {
    res.status(200).json('database resetted');
  } catch (error) {
    return next(new ErrorException(ErrorCode.ServerError));
  }
}
