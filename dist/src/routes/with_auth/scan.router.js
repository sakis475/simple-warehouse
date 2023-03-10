"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanRouter = void 0;
const express_1 = require("express");
const scan_controller_1 = require("../../controller/scan.controller");
const auth_middleware_1 = require("../../auth/auth-middleware");
exports.scanRouter = (0, express_1.Router)();
exports.scanRouter.put('/', auth_middleware_1.authMiddleware, scan_controller_1.putScan);
