"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetDatabaseRouter = void 0;
const express_1 = require("express");
const resetDatabase_controller_1 = require("../../controller/resetDatabase.controller");
const auth_middleware_1 = require("../../auth/auth-middleware");
exports.resetDatabaseRouter = (0, express_1.Router)();
exports.resetDatabaseRouter.get('/', auth_middleware_1.authMiddleware, resetDatabase_controller_1.getResetDatabase);
