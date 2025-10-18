"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authintication_middlewear_1 = require("../../middlewear/authintication/authintication.middlewear");
const chat_service_1 = __importDefault(require("./chat.service"));
const chatRouter = (0, express_1.Router)();
chatRouter.get("/:userId", (0, authintication_middlewear_1.isAuth)(), chat_service_1.default.getChat);
exports.default = chatRouter;
