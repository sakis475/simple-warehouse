"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorException = void 0;
const error_code_1 = require("./error-code");
class ErrorException extends Error {
    constructor(code = error_code_1.ErrorCode.UnknownError) {
        super(code);
        this.status = 500;
        this.description = code;
        this.status = 500;
        switch (code) {
            case error_code_1.ErrorCode.NoNameOrPassword:
                this.status = 404;
                break;
            case error_code_1.ErrorCode.BadRequestError:
                this.status = 400;
                break;
            case error_code_1.ErrorCode.Unauthorized:
                this.status = 401;
                break;
            case error_code_1.ErrorCode.NotFound:
                this.status = 404;
                break;
            case error_code_1.ErrorCode.AssetNotFound:
                this.status = 404;
                break;
            case error_code_1.ErrorCode.RequestTimeoutError:
                this.status = 408;
                break;
            case error_code_1.ErrorCode.DuplicateUserError:
                this.status = 405;
                break;
            case error_code_1.ErrorCode.NoUserFoundError:
                this.status = 405;
                break;
            case error_code_1.ErrorCode.WrongPasswordError:
                this.status = 401;
                break;
            case error_code_1.ErrorCode.ServerError:
                this.status = 500;
                break;
            case error_code_1.ErrorCode.WrongRegisterPasswordError:
                this.status = 401;
                break;
            case error_code_1.ErrorCode.WrongInput:
                this.status = 404;
                break;
            default:
                this.status = 500;
                break;
        }
    }
}
exports.ErrorException = ErrorException;
