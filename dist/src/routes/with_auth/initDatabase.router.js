"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabaseRouter = void 0;
const express_1 = require("express");
const initDatabase_controller_1 = require("../../controller/initDatabase.controller");
const auth_middleware_1 = require("../../auth/auth-middleware");
exports.initDatabaseRouter = (0, express_1.Router)();
exports.initDatabaseRouter.get('/', auth_middleware_1.authMiddleware, initDatabase_controller_1.getInitDatabase);
