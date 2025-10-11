import { Router } from "express";
import { isAuth } from "../../middlewear/authintication/authintication.middlewear";
import commentService from "./comment.service";

const CommentRouter = Router({mergeParams:true}) // to get all ids from first param

CommentRouter.post("{/:id}",isAuth(),commentService.addComment)    //{} for optinol id

// (/post/postId/comment/commentId || /comment/commentId) -> for reply

CommentRouter.get("/:id",isAuth(),commentService.getSpecifcComment)

CommentRouter.delete("/:id",isAuth(),commentService.deleteComment)

CommentRouter.patch("/:id",isAuth(),commentService.addReaction)

CommentRouter.get("/:id/with-replies", isAuth(), commentService.getCommentWithReply);

CommentRouter.patch("/:id/freeze", isAuth(), commentService.freezeComment);







export default CommentRouter