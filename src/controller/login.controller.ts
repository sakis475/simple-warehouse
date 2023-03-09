import { Request, Response } from 'express';
import { ErrorCode } from '../error_handler/error-code';
import { ErrorException } from '../error_handler/error-exception';
import { comparePassword } from '../auth/password-hash';
import { generateAuthToken } from '../auth/jwt';

//clients needs the REGISTER_AUTH_TOKEN to add it as a parameter of the URI
export async function postLogin(req: Request, res: Response, next: any) {
  const { name, password } = req.body;

  const userExists: any = {}; //await UserModel.findOne({ name });

  if (!userExists) {
    return next(new ErrorException(ErrorCode.NoUserFoundError));
  }

  const validPassword = comparePassword(password, userExists.password);
  if (!validPassword) {
    return next(new ErrorException(ErrorCode.WrongPasswordError));
  }

  res.json({ token: generateAuthToken(userExists) });
}
