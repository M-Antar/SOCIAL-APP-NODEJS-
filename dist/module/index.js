"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.AuthRouter = void 0;
const auth_controller_1 = __importDefault(require("./auth/auth.controller"));
exports.AuthRouter = auth_controller_1.default;
const user_controller_1 = __importDefault(require("./user/user.controller"));
exports.userRouter = user_controller_1.default;
