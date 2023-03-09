import { Request, Response } from 'express';
import { ErrorCode } from '../error_handler/error-code';
import { ErrorException } from '../error_handler/error-exception';

export async function getDrivers(req: Request, res: Response, next: any) {
  try {
    const results = '';
    res.json(results);
  } catch (error) {
    console.log(error);

    return next(new ErrorException(ErrorCode.ServerError));
  }
}

export async function postDrivers(req: Request, res: Response, next: any) {}
export async function putDrivers(req: Request, res: Response, next: any) {}
export async function deleteDrivers(req: Request, res: Response, next: any) {}
