import { Request, Response } from 'express';
import { ErrorCode } from '../error_handler/error-code';
import { ErrorException } from '../error_handler/error-exception';

export async function putScan(req: Request, res: Response, next: any) {
  const { voucher } = req.params;

  try {
    //if voucher exists turn scanned from false to true
  } catch (error) {
    return next(new ErrorException(ErrorCode.ServerError));
  }
}
