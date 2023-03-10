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
exports.usersDB = void 0;
const postgres_connect_1 = require("../postgres-connect");
exports.usersDB = {};
// get a user
exports.usersDB.getUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield postgres_connect_1.pool.query(`
    SELECT * 
    FROM users 
    WHERE name = '${user}'
    `);
        return rows;
    }
    catch (error) {
        throw new Error(`'Database Error', ${error}`);
    }
});
// create one user
exports.usersDB.createOne = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield postgres_connect_1.pool.query(`
    INSERT INTO users
    VALUES ('${user._id}', '${user.name}', '${user.password}')
    `);
        return user;
    }
    catch (error) {
        throw new Error(`'Database Error', ${error}`);
    }
});
