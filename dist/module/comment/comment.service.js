"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repository_1 = require("../../DB/model/post/post.repository");
const error_1 = require("../../utils/common/error");
const comment_repository_1 = require("../../DB/model/comment/comment.repository");
const factory_1 = require("./factory");
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
}
exports.default = new CommentService();
