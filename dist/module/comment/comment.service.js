"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repository_1 = require("../../DB/model/post/post.repository");
const error_1 = require("../../utils/common/error");
const comment_repository_1 = require("../../DB/model/comment/comment.repository");
const factory_1 = require("./factory");
const react_providor_1 = require("../../utils/common/providors/react.providor");
class CommentService {
    postRepository = new post_repository_1.postRepository();
    CommentRepository = new comment_repository_1.CommentRepository();
    commentFactoryService = new factory_1.CommentFactoryService();
    addComment = async (req, res) => {
        const { postId, id } = req.params;
        const createCommentDTO = req.body;
        const post = await this.postRepository.exist({ _id: postId });
        if (!post)
            throw new error_1.NotFoundException("Post Not Found");
        let commentExist = undefined;
        if (id) {
            commentExist = await this.CommentRepository.exist({ _id: id });
            if (!commentExist)
                throw new error_1.NotFoundException("Comment Not Found");
        }
        const comment = await this.commentFactoryService.createComment(createCommentDTO, req.user, post, commentExist);
        const createdComment = await this.CommentRepository.createItem(comment);
        return res.status(201).json({ message: "Comment Created Successfully", success: true, data: { createdComment } });
    };
    getSpecifcComment = async (req, res) => {
        const { id } = req.params;
        const commentExist = await this.CommentRepository.exist({ _id: id }, {}, { populate: [{ path: "replies" }] });
        if (!commentExist)
            throw new error_1.NotFoundException("Comment Not Found");
        return res.status(201).json({ success: true, data: { commentExist } });
    };
    deleteComment = async (req, res) => {
        const { id } = req.params;
        const commentExist = await this.CommentRepository.exist({ _id: id }, {}, { populate: [{ path: "postId", select: "userId" }] });
        if (!commentExist)
            new error_1.NotFoundException("Comment Not Found");
        if (commentExist?.userId.toString() != req.user?._id && (commentExist?.postId).userId.toString() != req.user?._id.toString())
            throw new error_1.NotAuthorizedException("You are not athorized to delete this comment");
        await this.CommentRepository.delete({ _id: id });
        res.status(201).json({ message: "Comment Deleted Successfully" });
    };
    addReaction = async (req, res) => {
        // get data from req
        const { id } = req.params;
        const { reaction } = req.body;
        // add reaction
        await (0, react_providor_1.addReactionProvider)(this.CommentRepository, id, req.user._id, reaction);
        // send response
        return res.sendStatus(204);
    };
}
exports.default = new CommentService();
