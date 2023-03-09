import { Request, Response } from 'express';
import { resetDatabase } from '../../scripts/reset_dbs';
import { ErrorCode } from '../error_handler/error-code';
import { ErrorException } from '../error_handler/error-exception';

export async function getResetDatabase(req: Request, res: Response, next: any) {
  try {
    await resetDatabase();

    res.status(200).json('database resetted');
  } catch (error) {
    console.log(error);
    return next(new ErrorException(ErrorCode.ServerError));
  }
}
