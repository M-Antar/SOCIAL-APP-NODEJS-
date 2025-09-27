"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authintication_middlewear_1 = require("../../middlewear/authintication/authintication.middlewear");
const comment_service_1 = __importDefault(require("./comment.service"));
const CommentRouter = (0, express_1.Router)({ mergeParams: true }); // to get all ids from first param
CommentRouter.post("{/:id}", (0, authintication_middlewear_1.isAuth)(), comment_service_1.default.addComment); //{} for optinol id
exports.default = CommentRouter;
