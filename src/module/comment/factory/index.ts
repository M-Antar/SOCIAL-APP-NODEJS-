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
        newComment.postId=post._id || comment!.postId  // reply from notifiction without send postId
        newComment.parentId=comment!?._id ||null ;
        newComment.reactions=[];

        return newComment
    }
}