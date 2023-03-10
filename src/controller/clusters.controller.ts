import { Request, Response } from 'express';
import { clustersDB } from '../model/db/clusters.db';
import { ErrorCode } from '../error_handler/error-code';
import { ErrorException } from '../error_handler/error-exception';

export async function getClusters(req: Request, res: Response, next: any) {
  try {
    const results = await clustersDB.getClusters();
    res.json(results);
  } catch (error) {
    console.log(error);
    return next(new ErrorException(ErrorCode.ServerError));
  }
}

export async function postClusters(req: Request, res: Response, next: any) {
  const { name, postcode } = req.body;

  if (!(name && postcode))
    return next(new ErrorException(ErrorCode.WrongInput));

  try {
    const results = await clustersDB.createOne({ name, postcode });
    res.status(201).json(results);
  } catch (error) {
    // console.log(error);
    return next(new ErrorException(ErrorCode.ServerError));
  }
}

export async function putClusters(req: Request, res: Response, next: any) {
  const { name, newName, postcode } = req.body;

  if (!(name && postcode && newName))
    return next(new ErrorException(ErrorCode.WrongInput));

  try {
    const results = await clustersDB.updateOne({ name, newName, postcode });
    res.status(201).json(results);
  } catch (error) {
    console.log(error);
    return next(new ErrorException(ErrorCode.ServerError));
  }
}
export async function deleteClusters(req: Request, res: Response, next: any) {
  const { name } = req.query;

  if (!name) return next(new ErrorException(ErrorCode.WrongInput));

  try {
    const results = await clustersDB.deleteOne(name);
    res.json(results);
  } catch (error) {
    console.log(error);
    return next(new ErrorException(ErrorCode.ServerError));
  }
}
