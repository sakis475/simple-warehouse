"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = void 0;
const error_code_1 = require("../error_handler/error-code");
const error_exception_1 = require("../error_handler/error-exception");
const password_hash_1 = require("../auth/password-hash");
const jwt_1 = require("../auth/jwt");
const users_db_1 = require("../model/db/users.db");
//clients needs the REGISTER_AUTH_TOKEN to add it as a parameter of the URI
function postLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, password } = req.body;
        if (!name || !password) {
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.NoNameOrPassword));
        }
        const userExists = yield users_db_1.usersDB.getUser(name);
        if (!userExists || !userExists[0]) {
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.NoUserFoundError));
        }
        const validPassword = (0, password_hash_1.comparePassword)(password, userExists[0].password);
        if (!validPassword) {
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongPasswordError));
        }
        res.json({ token: (0, jwt_1.generateAuthToken)(userExists[0]) });
    });
}
exports.postLogin = postLogin;
