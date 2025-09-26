"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const factory_1 = require("./factory");
const post_repository_1 = require("../../DB/model/post/post.repository");
const error_1 = require("../../utils/common/error");
//get data >> factory
// factory >> prepare data post >> post entity >> repository
// repository >> post entity >> DB
//send res
class postService {
    postFactoryService = new factory_1.PostFactoryService();
    postRepository = new post_repository_1.postRepository();
    create = async (req, res, next) => {
        const creatPostDTO = req.body;
        const post = this.postFactoryService.createpost(creatPostDTO, req.user); //(!) ->  as it is exist not undefind
        const createdPost = await this.postRepository.createItem(post);
        return res.status(201).json({
            message: "post created successfully",
            success: true,
            data: { createdPost }
        });
    };
    AddReaction = async (req, res) => {
        const { id } = req.params;
        const { reaction } = req.body;
        const userId = req.user._id;
        // get the post
        const post = await this.postRepository.exist({ _id: id });
        if (!post)
            throw new error_1.NotFoundException("Post not found");
        const userReactedIndex = post.reactions.findIndex(r => r.userId.toString() === userId.toString());
        if (userReactedIndex == -1) {
            await this.postRepository.update({ _id: id }, { $push: { reactions: { reaction, userId } } });
        }
        else {
            await this.postRepository.update({ _id: id, "reactions.userId": userId }, { $set: { "reactions.$.reaction": reaction } });
        }
        return res.sendStatus(204);
    };
}
exports.postService = postService;
exports.default = new postService();
