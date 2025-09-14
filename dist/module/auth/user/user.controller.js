"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("./user.service");
const userRouter = (0, express_1.Router)();
const userService = new user_service_1.UserService();
userRouter.get("/:id", userService.getProfile);
exports.default = userRouter;
