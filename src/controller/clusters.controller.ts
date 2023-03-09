import { Request, Response } from 'express';
import { ErrorCode } from '../error_handler/error-code';
import { ErrorException } from '../error_handler/error-exception';

export async function getClusters(req: Request, res: Response, next: any) {
  try {
    const results = '';
    res.json(results);
  } catch (error) {
    console.log(error);

    return next(new ErrorException(ErrorCode.ServerError));
  }
}

export async function postClusters(req: Request, res: Response, next: any) {}
export async function putClusters(req: Request, res: Response, next: any) {}
export async function deleteClusters(req: Request, res: Response, next: any) {}
