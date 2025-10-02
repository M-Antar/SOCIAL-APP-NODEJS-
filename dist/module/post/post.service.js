"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const factory_1 = require("./factory");
const post_repository_1 = require("../../DB/model/post/post.repository");
const error_1 = require("../../utils/common/error");
const react_providor_1 = require("../../utils/common/providors/react.providor");
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
        await (0, react_providor_1.addReactionProvider)(this.postRepository, id, userId, reaction);
        return res.sendStatus(204);
    };
    getSpecificPost = async (req, res) => {
        const { id } = req.params;
        const post = await this.postRepository.getOne({ _id: id }, {}, {
            populate: [
                {
                    path: "userId",
                    select: "firstName lastName fullName"
                },
                {
                    path: "reactions.userId",
                    select: "firstName lastName fullName"
                },
                {
                    path: "comments",
                    match: { parentId: null }
                }
            ]
        });
        if (!post)
            throw new error_1.NotFoundException("Post not found");
        return res.status(200).json({ message: "done", success: true, data: { post } });
    };
    deletePost = async (req, res) => {
        const { id } = req.params;
        const postExist = await this.postRepository.exist({ _id: id });
        if (postExist?.userId.toString() != req.user?._id)
            throw new error_1.NotAuthorizedException("You are not athorized to delete this post");
        if (!postExist)
            throw new error_1.NotFoundException("Post not found");
        await this.postRepository.delete({ _id: id });
        res.status(200).json({ message: "Post Deleted Successfully" });
    };
}
exports.postService = postService;
exports.default = new postService();
