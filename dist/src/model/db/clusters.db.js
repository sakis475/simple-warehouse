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
exports.clustersDB = void 0;
const postgres_connect_1 = require("../postgres-connect");
exports.clustersDB = {};
// get clusters
exports.clustersDB.getClusters = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield postgres_connect_1.pool.query(`
    SELECT * 
    FROM clusters
    `);
        return rows;
    }
    catch (error) {
        throw new Error(`'Database Error', ${error}`);
    }
});
// create one cluster
exports.clustersDB.createOne = (cluster) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield postgres_connect_1.pool.query(`
    INSERT INTO clusters
    VALUES ('${cluster.name}', '${cluster.postcode}')
    `);
        return rows;
    }
    catch (error) {
        throw new Error(`'Database Error', ${error}`);
    }
});
// update a cluster
exports.clustersDB.updateOne = (cluster) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield postgres_connect_1.pool.query(`
      UPDATE clusters
      SET 
        name = '${cluster.newName}',
        postcode = '${cluster.postcode}'
      WHERE name = '${cluster.name}'
      `);
        return rows;
    }
    catch (error) {
        throw new Error(`'Database Error', ${error}`);
    }
});
// delete a cluster
exports.clustersDB.deleteOne = (clusterName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield postgres_connect_1.pool.query(`
        DELETE FROM clusters 
        WHERE name = '${clusterName}'
        `);
        return rows;
    }
    catch (error) {
        throw new Error(`'Database Error', ${error}`);
    }
});
