"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
class ErrorCode {
}
exports.ErrorCode = ErrorCode;
ErrorCode.Unauthorized = 'Unauthorized Access is Forbidden';
ErrorCode.NotFound = 'Request is not found..';
ErrorCode.AssetNotFound = 'Asset is not found';
ErrorCode.BadRequestError = 'BadRequestError';
ErrorCode.RequestTimeoutError = 'Request Timed Out';
ErrorCode.UnknownError = 'Something went wrong..';
ErrorCode.DuplicateUserError = 'User already exist with that name';
ErrorCode.NoUserFoundError = 'User Name does not exist';
ErrorCode.WrongPasswordError = 'Password is not correct';
ErrorCode.ServerError = 'Something wrong happened on the server';
ErrorCode.NoNameOrPassword = 'You must provide a username and password';
ErrorCode.WrongRegisterPasswordError = 'Register Password is Incorrect please contact administrator to provide you one.';
ErrorCode.BodyNotJSON = 'This request requires JSON data inside body.';
ErrorCode.WrongInput = 'You sended wrong input into the body.';
