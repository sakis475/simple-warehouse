"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = require("express");
const login_controller_1 = require("../../controller/login.controller");
exports.loginRouter = (0, express_1.Router)();
exports.loginRouter.post('/', login_controller_1.postLogin);
