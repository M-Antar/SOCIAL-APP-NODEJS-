import { Router } from "express";
import { isAuth } from "../../middlewear/authintication/authintication.middlewear";
import commentService from "./comment.service";

const CommentRouter = Router({mergeParams:true}) // to get all ids from first param

CommentRouter.post("{/:id}",isAuth(),commentService.addComment)    //{} for optinol id

export default CommentRouter