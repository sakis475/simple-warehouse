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
exports.putScan = void 0;
const orders_db_1 = require("../model/db/orders.db");
const error_code_1 = require("../error_handler/error-code");
const error_exception_1 = require("../error_handler/error-exception");
function putScan(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { voucher } = req.body;
        if (!voucher)
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        try {
            //if voucher exists turn scanned from false to true
            const results = yield orders_db_1.ordersDB.updateScanned({ voucher, scanned: true });
            res.json(results);
        }
        catch (error) {
            if ((error = 'This voucher wasnt found'))
                return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.NotFound));
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ServerError));
        }
    });
}
exports.putScan = putScan;
