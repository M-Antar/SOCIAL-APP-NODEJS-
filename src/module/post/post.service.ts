import { NextFunction, Request, Response } from "express";
import { CreatePostDTO } from "./post.DTO";
import { PostFactoryService } from "./factory";
import { postRepository } from "../../DB/model/post/post.repository";
import { NotFoundException } from "../../utils/common/error";
import { REACTION } from "../../utils/common/enum";
import { success } from "zod";



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

    const post = await this.postRepository.exist({ _id: id });
    if (!post) throw new NotFoundException("Post not found");

    const userReactedIndex = post.reactions.findIndex(
        r => r.userId.toString() === userId.toString()
    );

    if (userReactedIndex == -1) {
        // User never reacted → create new reaction
        await this.postRepository.update(
            { _id: id },
            { $push: { reactions: { reaction: reaction , userId } } }
        );
    } else {
        if ([undefined, null, ""].includes(reaction)) {
            // User reacted before but sent null → remove reaction
            await this.postRepository.update(
                { _id: id },
                { $pull: { reactions: { userId } } }
            );
        } else {
            // User reacted before → update reaction
            await this.postRepository.update(
                { _id: id, "reactions.userId": userId },
                { $set: { "reactions.$.reaction": reaction } }
            );
        }
    }

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
        match:{parentId:[]}
      }
    ]
  }
);

    if (!post) throw new NotFoundException("Post not found");

    return res.status(200).json({message:"done",success:true,data:{post}})


}


}
export default new postService()