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
exports.getResetDatabase = void 0;
const reset_dbs_1 = require("../../scripts/reset_dbs");
const error_code_1 = require("../error_handler/error-code");
const error_exception_1 = require("../error_handler/error-exception");
function getResetDatabase(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, reset_dbs_1.resetDatabase)();
            res.status(200).json('database resetted');
        }
        catch (error) {
            console.log(error);
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ServerError));
        }
    });
}
exports.getResetDatabase = getResetDatabase;
