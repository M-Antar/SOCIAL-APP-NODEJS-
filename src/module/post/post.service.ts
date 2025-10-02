import { NextFunction, Request, Response } from "express";
import { CreatePostDTO } from "./post.DTO";
import { PostFactoryService } from "./factory";
import { postRepository } from "../../DB/model/post/post.repository";
import { NotAuthorizedException, NotFoundException } from "../../utils/common/error";
import { REACTION } from "../../utils/common/enum";
import { success } from "zod";
import { addReactionProvider } from "../../utils/common/providors/react.providor";
import { CommentRepository } from "../../DB/model/comment/comment.repository";



//get data >> factory
// factory >> prepare data post >> post entity >> repository
// repository >> post entity >> DB
//send res


export class postService{

    private readonly postFactoryService = new PostFactoryService()
    private readonly postRepository = new postRepository()

 public create = async (req:Request,res:Response,next:NextFunction)=>{
    const creatPostDTO:CreatePostDTO=req.body;
    const post = this.postFactoryService.createpost(creatPostDTO,req.user!) //(!) ->  as it is exist not undefind
    const createdPost = await this.postRepository.createItem(post)

    return res.status(201).json({
        message:"post created successfully",
        success:true,
        data:{createdPost}
    })

    


}

public AddReaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reaction } = req.body;
  const userId = req.user!._id;

  await addReactionProvider(this.postRepository, id as string, userId as unknown as string, reaction);

  return res.sendStatus(204);
};


public getSpecificPost = async (req:Request,res:Response)=>{
    const {id} = req.params;

const post = await this.postRepository.getOne(
  { _id: id },
  {},
  {
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
        match:{parentId:null}
      }
    ]
  }
);

    if (!post) throw new NotFoundException("Post not found");

    return res.status(200).json({message:"done",success:true,data:{post}})


}

public deletePost = async (req:Request,res:Response)=>{
    const {id} = req.params;

    const postExist = await this.postRepository.exist({_id:id})

    if(postExist?.userId.toString()!=req.user?._id)
        throw new NotAuthorizedException("You are not athorized to delete this post")

    if(!postExist) throw new NotFoundException("Post not found");

    await this.postRepository.delete({_id:id})

     res.status(200).json({message:"Post Deleted Successfully"})

}


}
export default new postService() 