import { Types } from "mongoose";
import { IComment } from "../../../DB/model/comment/comment.interface";
import { IPost } from "../../../DB/model/post/post.interface";
import { IUser } from "../../../DB/model/user/user.interface";
import { ICommentDTO } from "../comment.DTO";
import { Comment } from "../entity";

export class CommentFactoryService{
    createComment(createCommentDTO:ICommentDTO,user:IUser,post:IPost,comment?:IComment){
        const newComment = new Comment()
        newComment.content=createCommentDTO.content
        newComment.userId=user._id
        newComment.postId=post._id
        newComment.parentId=comment? [...comment.parentId,comment._id]: []
        newComment.reactions=[];

        return newComment
    }
}