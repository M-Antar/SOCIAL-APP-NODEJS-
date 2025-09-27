"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const abstractrepository_1 = require("../../abstractrepository");
const comment_model_1 = require("./comment.model");
class CommentRepository extends abstractrepository_1.AbstractRepository {
    constructor() {
        super(comment_model_1.Comment);
    }
}
exports.CommentRepository = CommentRepository;
