"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const error_code_1 = require("../error_handler/error-code");
const error_exception_1 = require("../error_handler/error-exception");
const jwt_1 = require("./jwt");
const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer')) {
        const token = auth.split(' ')[1]; //auth looks like this "Bearer a1Ddsa21f2312..."
        try {
            const tokenData = (0, jwt_1.verifyToken)(token);
            req.body.tokenData = tokenData;
            next();
        }
        catch (error) {
            throw new error_exception_1.ErrorException(error_code_1.ErrorCode.Unauthorized);
        }
    }
    else {
        throw new error_exception_1.ErrorException(error_code_1.ErrorCode.Unauthorized);
    }
};
exports.authMiddleware = authMiddleware;
