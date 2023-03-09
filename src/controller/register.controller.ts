import { Request, Response } from 'express';
import { ErrorCode } from '../error_handler/error-code';
import { ErrorException } from '../error_handler/error-exception';
import { passwordHash } from '../auth/password-hash';
import { ulid } from 'ulid';
import { generateAuthToken } from '../auth/jwt';
import { User } from '../model/interface/IUser';
import { usersDB } from '../model/db/users.db';

//clients needs the REGISTER_AUTH_TOKEN to add it as a parameter of the URI
export async function postRegister(req: Request, res: Response, next: any) {
  const { name, password, registerToken } = req.body;

  if (!name || !password) {
    console.log('NoNameOrPassword error');
    return next(new ErrorException(ErrorCode.NoNameOrPassword));
  }

  if (process.env.REGISTER_AUTH_TOKEN !== registerToken) {
    return next(new ErrorException(ErrorCode.WrongRegisterPasswordError));
  }

  const userExists = await usersDB.getUser(name);

  if (userExists && userExists[0]) {
    return next(new ErrorException(ErrorCode.DuplicateUserError));
  }

  const hash = passwordHash(password);
  const newUser: User = {
    _id: ulid(),
    name,
    password: hash
  };

  const created = await usersDB.createOne(newUser);

  res.status(201).json({ token: generateAuthToken(newUser) });
}
