import { Request, Response } from 'express';
import { ordersDB } from '../model/db/orders.db';
import { ErrorCode } from '../error_handler/error-code';
import { ErrorException } from '../error_handler/error-exception';

export async function getOrder(req: Request, res: Response, next: any) {
  const driverExists = req.query.driver; //driverExists as in req.query
  const scannedExists =
    req.query.scanned === 'true' || req.query.scanned === 'false'; //scannedExists as in req.query

  //put in the table's column value that you want to query in the form
  //[table, column, value]
  //use in case you want to search like WHERE X.a =
  const parametersQuery = [];

  if (scannedExists) {
    if (req.query.scanned === 'true') {
      parametersQuery.push({ table: 'orders', column: 'scanned', value: true });
    } else if (req.query.scanned === 'false') {
      parametersQuery.push({
        table: 'orders',
        column: 'scanned',
        value: false
      });
    }
  }

  if (driverExists && driverExists.length) {
    parametersQuery.push({
      table: 'drivers',
      column: 'name',
      value: driverExists
    });
  }

  try {
    const results = await ordersDB.getOrders(parametersQuery);
    res.json(results);
  } catch (error) {
    console.log(error);
    return next(new ErrorException(ErrorCode.ServerError));
  }
}

export async function postOrder(req: Request, res: Response, next: any) {
  const { voucher, postcode } = req.body;

  if (!voucher || !postcode)
    return next(new ErrorException(ErrorCode.WrongInput));

  try {
    const results = await ordersDB.createOne({ voucher, postcode });
    res.status(201).json(results);
  } catch (error: any) {
    console.log(error);
    return next(new ErrorException(ErrorCode.ServerError));
  }
}
export async function putOrder(req: Request, res: Response, next: any) {
  const { voucher, postcode, scanned } = req.body;

  if (!voucher || !postcode || !scanned)
    return next(new ErrorException(ErrorCode.WrongInput));

  try {
    const results = await ordersDB.updateOne({ voucher, postcode, scanned });
    res.status(201).json(results);
  } catch (error: any) {
    console.log(error);
    return next(new ErrorException(ErrorCode.ServerError));
  }
}
export async function deleteOrder(req: Request, res: Response, next: any) {
  const { voucher } = req.query;

  if (!voucher) return next(new ErrorException(ErrorCode.WrongInput));

  try {
    const results = await ordersDB.deleteOne(voucher);
    res.json(results);
  } catch (error: any) {
    console.log(error);
    return next(new ErrorException(ErrorCode.ServerError));
  }
}
