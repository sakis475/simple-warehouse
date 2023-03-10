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
exports.deleteOrder = exports.putOrder = exports.postOrder = exports.getOrder = void 0;
const orders_db_1 = require("../model/db/orders.db");
const error_code_1 = require("../error_handler/error-code");
const error_exception_1 = require("../error_handler/error-exception");
function getOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const driverExists = req.query.driver; //driverExists as in req.query
        const scannedExists = req.query.scanned === 'true' || req.query.scanned === 'false'; //scannedExists as in req.query
        //put in the table's column value that you want to query in the form
        //[table, column, value]
        const parametersQuery = [];
        if (scannedExists) {
            if (!/^(true|false)$/i.test(String(scannedExists)))
                return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
            if (req.query.scanned === 'true') {
                parametersQuery.push({ table: 'orders', column: 'scanned', value: true });
            }
            else if (req.query.scanned === 'false') {
                parametersQuery.push({
                    table: 'orders',
                    column: 'scanned',
                    value: false
                });
            }
        }
        if (driverExists && driverExists.length) {
            const regexCheckName = /^[A-Za-z][A-Za-z0-9_]{1,29}$/;
            if (!regexCheckName.test(String(driverExists)))
                return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
            parametersQuery.push({
                table: 'drivers',
                column: 'name',
                value: driverExists
            });
        }
        try {
            const results = yield orders_db_1.ordersDB.getOrders(parametersQuery);
            res.json(results);
        }
        catch (error) {
            console.log(error);
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ServerError));
        }
    });
}
exports.getOrder = getOrder;
function postOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { voucher, postcode } = req.body;
        if (!voucher || !postcode)
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        const regexCheckVoucher = /[A-Za-z][0-9][A-Za-z]/;
        if (!(regexCheckVoucher.test(voucher) && /\d{5}/.test(postcode)))
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        try {
            const results = yield orders_db_1.ordersDB.createOne({ voucher, postcode });
            res.status(201).json(results);
        }
        catch (error) {
            console.log(error);
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ServerError));
        }
    });
}
exports.postOrder = postOrder;
function putOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { voucher, postcode, scanned } = req.body;
        if (!voucher || !postcode || !scanned)
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        const regexCheckVoucher = /[A-Za-z][0-9][A-Za-z]/;
        if (!(regexCheckVoucher.test(voucher) &&
            /\d{5}/.test(postcode) &&
            /^(true|false)$/i.test(scanned)))
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        try {
            const results = yield orders_db_1.ordersDB.updateOne({ voucher, postcode, scanned });
            res.status(201).json(results);
        }
        catch (error) {
            console.log(error);
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ServerError));
        }
    });
}
exports.putOrder = putOrder;
function deleteOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { voucher } = req.query;
        if (!voucher)
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        const regexCheckName = /^[A-Za-z][A-Za-z0-9_]{1,29}$/;
        if (!regexCheckName.test(String(voucher)))
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        try {
            const results = yield orders_db_1.ordersDB.deleteOne(voucher);
            res.json(results);
        }
        catch (error) {
            console.log(error);
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ServerError));
        }
    });
}
exports.deleteOrder = deleteOrder;
