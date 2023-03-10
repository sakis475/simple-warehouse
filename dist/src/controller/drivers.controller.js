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
exports.deleteDrivers = exports.putDrivers = exports.postDrivers = exports.getDrivers = void 0;
const drivers_db_1 = require("../model/db/drivers.db");
const error_code_1 = require("../error_handler/error-code");
const error_exception_1 = require("../error_handler/error-exception");
function getDrivers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield drivers_db_1.driversDB.getDrivers();
            res.json(results);
        }
        catch (error) {
            console.log(error);
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ServerError));
        }
    });
}
exports.getDrivers = getDrivers;
function postDrivers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, cluster } = req.body;
        if (!(name && cluster))
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        const regexCheckName = /^[A-Za-z][A-Za-z0-9_]{1,29}$/;
        if (!(regexCheckName.test(name) && /[A-Z]/.test(cluster)))
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        try {
            const results = yield drivers_db_1.driversDB.createOne({ name, cluster });
            res.status(201).json(results);
        }
        catch (error) {
            // console.log(error);
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ServerError));
        }
    });
}
exports.postDrivers = postDrivers;
function putDrivers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, newName, cluster } = req.body;
        if (!(name && cluster && newName))
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        const regexCheckName = /^[A-Za-z][A-Za-z0-9_]{1,29}$/;
        if (!(regexCheckName.test(name) &&
            regexCheckName.test(newName) &&
            /[A-Z]/.test(cluster)))
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        try {
            const results = yield drivers_db_1.driversDB.updateOne({ name, newName, cluster });
            res.status(201).json(results);
        }
        catch (error) {
            console.log(error);
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ServerError));
        }
    });
}
exports.putDrivers = putDrivers;
function deleteDrivers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.query;
        const regexCheckName = /^[A-Za-z][A-Za-z0-9_]{1,29}$/;
        if (!name)
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        if (!regexCheckName.test(String(name)))
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        try {
            const results = yield drivers_db_1.driversDB.deleteOne(name);
            res.json(results);
        }
        catch (error) {
            console.log(error);
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ServerError));
        }
    });
}
exports.deleteDrivers = deleteDrivers;
