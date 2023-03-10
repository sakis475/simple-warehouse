"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const error_code_1 = require("./error-code");
const error_exception_1 = require("./error-exception");
const errorHandler = (err, req, res, next) => {
    if (err instanceof error_exception_1.ErrorException) {
        res.status(err.status).json(err);
    }
    else {
        console.log(err);
        // unhandled errors returns with 500 status
        res
            .status(500)
            .json({ code: error_code_1.ErrorCode.UnknownError, status: 500 });
    }
};
exports.errorHandler = errorHandler;
