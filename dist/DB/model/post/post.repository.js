"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const abstractrepository_1 = require("../../abstractrepository");
const post_model_1 = require("./post.model");
class postRepository extends abstractrepository_1.AbstractRepository {
    constructor() {
        super(post_model_1.Post);
    }
}
exports.postRepository = postRepository;
