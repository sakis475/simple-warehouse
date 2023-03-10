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
exports.disconnect = exports.pool = exports.connect = void 0;
const pg_1 = require("pg");
const connect = () => {
    const poolConfig = process.env.NODE_ENV === 'test'
        ? JSON.parse(process.env.TEST_POSTGRES)
        : JSON.parse(process.env.POSTGRES);
    return new pg_1.Pool(poolConfig);
};
exports.connect = connect;
exports.pool = (0, exports.connect)();
const disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.pool.end();
});
exports.disconnect = disconnect;
