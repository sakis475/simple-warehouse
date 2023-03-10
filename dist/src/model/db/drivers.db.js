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
exports.driversDB = void 0;
const postgres_connect_1 = require("../postgres-connect");
exports.driversDB = {};
// get drivers
exports.driversDB.getDrivers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield postgres_connect_1.pool.query(`
    SELECT * 
    FROM drivers
    `);
        return rows;
    }
    catch (error) {
        throw new Error(`'Database Error', ${error}`);
    }
});
// create one driver
exports.driversDB.createOne = (driver) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield postgres_connect_1.pool.query(`
    INSERT INTO drivers
    VALUES ('${driver.name}', '${driver.cluster}')
    `);
        return rows;
    }
    catch (error) {
        throw new Error(`'Database Error', ${error}`);
    }
});
// update a driver
exports.driversDB.updateOne = (driver) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield postgres_connect_1.pool.query(`
      UPDATE drivers
      SET 
        name = '${driver.newName}',
        cluster = '${driver.cluster}'
      WHERE name = '${driver.name}'
      `);
        return rows;
    }
    catch (error) {
        throw new Error(`'Database Error', ${error}`);
    }
});
//delete a driver
exports.driversDB.deleteOne = (driverName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield postgres_connect_1.pool.query(`
        DELETE FROM drivers 
        WHERE name = '${driverName}'
        `);
        return rows;
    }
    catch (error) {
        throw new Error(`'Database Error', ${error}`);
    }
});
