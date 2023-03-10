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
exports.deleteClusters = exports.putClusters = exports.postClusters = exports.getClusters = void 0;
const clusters_db_1 = require("../model/db/clusters.db");
const error_code_1 = require("../error_handler/error-code");
const error_exception_1 = require("../error_handler/error-exception");
function getClusters(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield clusters_db_1.clustersDB.getClusters();
            res.json(results);
        }
        catch (error) {
            console.log(error);
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ServerError));
        }
    });
}
exports.getClusters = getClusters;
function postClusters(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, postcode } = req.body;
        if (!(name && postcode))
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        if (!(/^[A-Za-z][A-Za-z0-9_]{0,29}$/.test(name) && /\d{2}/.test(postcode)))
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        try {
            const results = yield clusters_db_1.clustersDB.createOne({ name, postcode });
            res.status(201).json(results);
        }
        catch (error) {
            // console.log(error);
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ServerError));
        }
    });
}
exports.postClusters = postClusters;
function putClusters(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, newName, postcode } = req.body;
        if (!name || !postcode || !newName)
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        const regexCheckName = /^[A-Za-z][A-Za-z0-9_]{0,29}$/;
        if (!(regexCheckName.test(name) &&
            regexCheckName.test(newName) &&
            /\d{2}/.test(postcode)))
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        try {
            const results = yield clusters_db_1.clustersDB.updateOne({ name, newName, postcode });
            res.status(201).json(results);
        }
        catch (error) {
            console.log(error);
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ServerError));
        }
    });
}
exports.putClusters = putClusters;
function deleteClusters(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.query;
        if (!name)
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.WrongInput));
        try {
            const results = yield clusters_db_1.clustersDB.deleteOne(name);
            res.json(results);
        }
        catch (error) {
            console.log(error);
            return next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ServerError));
        }
    });
}
exports.deleteClusters = deleteClusters;
