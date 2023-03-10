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
function getOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const driverExists = req.params.driver; //driverExists as in req.params
        const scannedExists = req.query.scanned === 'true' || req.query.scanned === 'false'; //scannedExists as in req.params
        let scanned = false;
        if (scannedExists) {
            if (req.query.scanned === 'true') {
                scanned = true;
            }
            else if (req.query.scanned === 'false') {
                scanned = false;
            }
        }
    });
}
exports.getOrder = getOrder;
function postOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.postOrder = postOrder;
function putOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.putOrder = putOrder;
function deleteOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.deleteOrder = deleteOrder;
