"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFactoryService = void 0;
const entity_1 = require("../entity");
class PostFactoryService {
    createpost(createPostDTO, user) {
        const newPost = new entity_1.Post();
        newPost.content = createPostDTO.content;
        newPost.userId = user._id;
        newPost.attachments = [];
        newPost.reactions = [];
        return newPost;
    }
}
exports.PostFactoryService = PostFactoryService;
