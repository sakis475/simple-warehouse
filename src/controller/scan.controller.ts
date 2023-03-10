import { Request, Response } from 'express';
import { ordersDB } from '../model/db/orders.db';
import { ErrorCode } from '../error_handler/error-code';
import { ErrorException } from '../error_handler/error-exception';

export async function putScan(req: Request, res: Response, next: any) {
  const { voucher } = req.body;

  if (!voucher) return next(new ErrorException(ErrorCode.WrongInput));

  try {
    //if voucher exists turn scanned from false to true
    const results = await ordersDB.updateScanned({ voucher, scanned: true });
    res.json(results);
  } catch (error) {
    return next(new ErrorException(ErrorCode.ServerError));
  }
}
