"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouter = void 0;
const express_1 = require("express");
const register_controller_1 = require("../../controller/register.controller");
exports.registerRouter = (0, express_1.Router)();
exports.registerRouter.post('/', register_controller_1.postRegister);
