import { IUser } from "../../../DB/model/user/user.interface";
import { Post } from "../entity";
import { CreatePostDTO } from "../post.DTO";

export class PostFactoryService {
    createpost(createPostDTO:CreatePostDTO,user:IUser){
        const newPost = new Post()

        newPost.content=createPostDTO.content;
        newPost.userId=user._id;
        newPost.attachments=[];
        newPost.reactions=[];


        return newPost
    }
}