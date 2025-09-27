"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authintication_middlewear_1 = require("../../middlewear/authintication/authintication.middlewear");
const post_service_1 = __importDefault(require("./post.service"));
const comment_controller_1 = __importDefault(require("../comment/comment.controller"));
const PostRouter = (0, express_1.Router)();
PostRouter.use("/:postId/comment", comment_controller_1.default);
PostRouter.post("/create", (0, authintication_middlewear_1.isAuth)(), post_service_1.default.create);
PostRouter.patch("/:id", (0, authintication_middlewear_1.isAuth)(), post_service_1.default.AddReaction);
PostRouter.get("/:id", post_service_1.default.getSpecificPost);
exports.default = PostRouter;
