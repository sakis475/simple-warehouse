import { Request, Response } from 'express';
import { driversDB } from '../model/db/drivers.db';
import { ErrorCode } from '../error_handler/error-code';
import { ErrorException } from '../error_handler/error-exception';

export async function getDrivers(req: Request, res: Response, next: any) {
  try {
    const results = await driversDB.getDrivers();
    res.json(results);
  } catch (error) {
    console.log(error);
    return next(new ErrorException(ErrorCode.ServerError));
  }
}

export async function postDrivers(req: Request, res: Response, next: any) {
  const { name, cluster } = req.body;

  if (!(name && cluster)) return next(new ErrorException(ErrorCode.WrongInput));

  const regexCheckName = /^[A-Za-z][A-Za-z0-9_]{1,29}$/;

  if (!(regexCheckName.test(name) && /[A-Z]/.test(cluster)))
    return next(new ErrorException(ErrorCode.WrongInput));

  try {
    const results = await driversDB.createOne({ name, cluster });
    res.status(201).json(results);
  } catch (error) {
    // console.log(error);
    return next(new ErrorException(ErrorCode.ServerError));
  }
}

export async function putDrivers(req: Request, res: Response, next: any) {
  const { name, newName, cluster } = req.body;

  if (!(name && cluster && newName))
    return next(new ErrorException(ErrorCode.WrongInput));

  const regexCheckName = /^[A-Za-z][A-Za-z0-9_]{1,29}$/;

  if (
    !(
      regexCheckName.test(name) &&
      regexCheckName.test(newName) &&
      /[A-Z]/.test(cluster)
    )
  )
    return next(new ErrorException(ErrorCode.WrongInput));

  try {
    const results = await driversDB.updateOne({ name, newName, cluster });
    res.status(201).json(results);
  } catch (error) {
    console.log(error);
    return next(new ErrorException(ErrorCode.ServerError));
  }
}
export async function deleteDrivers(req: Request, res: Response, next: any) {
  const { name } = req.query;

  const regexCheckName = /^[A-Za-z][A-Za-z0-9_]{1,29}$/;

  if (!name) return next(new ErrorException(ErrorCode.WrongInput));

  if (!regexCheckName.test(String(name)))
    return next(new ErrorException(ErrorCode.WrongInput));

  try {
    const results = await driversDB.deleteOne(name);
    res.json(results);
  } catch (error) {
    console.log(error);
    return next(new ErrorException(ErrorCode.ServerError));
  }
}
