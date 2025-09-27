import { Router } from "express";
import { isAuth } from "../../middlewear/authintication/authintication.middlewear";
import postService from "./post.service";
import CommentRouter from "../comment/comment.controller";
const PostRouter =  Router() 

PostRouter.use("/:postId/comment",CommentRouter)

PostRouter.post("/create",isAuth(),postService.create)
PostRouter.patch("/:id",isAuth(),postService.AddReaction)
PostRouter.get("/:id",postService.getSpecificPost)







export default PostRouter