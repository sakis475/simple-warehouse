import { Request, Response } from 'express';
import { ErrorCode } from '../error_handler/error-code';
import { ErrorException } from '../error_handler/error-exception';

export async function getOrder(req: Request, res: Response, next: any) {
  const driverExists = req.params.driver; //driverExists as in req.params
  const scannedExists =
    req.query.scanned === 'true' || req.query.scanned === 'false'; //scannedExists as in req.params

  let scanned = false;
  if (scannedExists) {
    if (req.query.scanned === 'true') {
      scanned = true;
    } else if (req.query.scanned === 'false') {
      scanned = false;
    }
  }
}

export async function postOrder(req: Request, res: Response, next: any) {}
export async function putOrder(req: Request, res: Response, next: any) {}
export async function deleteOrder(req: Request, res: Response, next: any) {}
