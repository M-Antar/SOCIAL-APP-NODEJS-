import { Router } from "express";
import { isAuth } from "../../middlewear/authintication/authintication.middlewear";
import postService from "./post.service";
const PostRouter =  Router() 

PostRouter.post("/create",isAuth(),postService.create)
PostRouter.patch("/:id",isAuth(),postService.AddReaction)



export default PostRouter