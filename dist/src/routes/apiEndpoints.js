"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiEndpoints = void 0;
const express_1 = require("express");
const login_router_1 = require("./without_auth/login.router");
const register_router_1 = require("./without_auth/register.router");
const clusters_router_1 = require("./with_auth/clusters.router");
const drivers_router_1 = require("./with_auth/drivers.router");
const orders_router_1 = require("./with_auth/orders.router");
const resetDatabase_router_1 = require("./with_auth/resetDatabase.router");
const scan_router_1 = require("./with_auth/scan.router");
exports.apiEndpoints = (0, express_1.Router)();
exports.apiEndpoints.use('/login', login_router_1.loginRouter);
exports.apiEndpoints.use('/register', register_router_1.registerRouter);
exports.apiEndpoints.use('/order', orders_router_1.orderRouter);
exports.apiEndpoints.use('/scan', scan_router_1.scanRouter);
exports.apiEndpoints.use('/drivers', drivers_router_1.driversRouter);
exports.apiEndpoints.use('/clusters', clusters_router_1.clustersRouter);
exports.apiEndpoints.use('/reset-database', resetDatabase_router_1.resetDatabaseRouter);