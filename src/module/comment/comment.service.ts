import { Request, Response } from "express";
import { postRepository } from "../../DB/model/post/post.repository";
import { NotAuthorizedException, NotFoundException } from "../../utils/common/error";
import { CommentRepository } from "../../DB/model/comment/comment.repository";
import { IComment } from "../../DB/model/comment/comment.interface";
import { any, unknown } from "zod";
import { CommentFactoryService } from "./factory";
import { ICommentDTO } from "./comment.DTO";
import path from "path";
import { IPost } from "../../DB/model/post/post.interface";
import { addReactionProvider } from "../../utils/common/providors/react.providor";

class CommentService{

    private readonly postRepository = new postRepository()
    private readonly CommentRepository = new CommentRepository()
    private readonly commentFactoryService = new CommentFactoryService()




    public addComment = async (req:Request,res:Response) => {
        const {postId,id} = req.params
        const createCommentDTO:ICommentDTO=req.body
        const post = await this.postRepository.exist({_id:postId})

        if(!post) throw new NotFoundException("Post Not Found")

        let commentExist: IComment | any = undefined;


        if(id){
         commentExist = await this.CommentRepository.exist({_id:id})

        if(!commentExist) throw new NotFoundException("Comment Not Found")
        }

       const comment= await this.commentFactoryService.createComment(createCommentDTO,req.user!,post,commentExist)

      const createdComment = await this.CommentRepository.createItem(comment)

      return res.status(201).json({message:"Comment Created Successfully",success:true,data:{createdComment}})



        


    }

    public getSpecifcComment = async (req:Request,res:Response) => {
    
     const {id} = req.params;
     
     const commentExist = await this.CommentRepository.exist({_id:id},{},{populate:[{path:"replies"}]})

     if(!commentExist) throw new NotFoundException("Comment Not Found")

    return res.status(201).json({success:true,data:{commentExist}})
    }

    public deleteComment =  async (req:Request,res:Response) => {        

        const {id} = req.params;

        const commentExist= await this.CommentRepository.exist({_id:id},{},{populate:[{path:"postId",select:"userId"}]})

         if(!commentExist) new NotFoundException("Comment Not Found")

        if(commentExist?.userId.toString()!=req.user?._id && (commentExist?.postId as unknown as IPost).userId.toString() != req.user?._id.toString())
             throw new NotAuthorizedException("You are not athorized to delete this comment")

        await this.CommentRepository.delete({_id:id})

        res.status(201).json({message:"Comment Deleted Successfully"})
    }

    public addReaction = async (req: Request, res: Response) => {
  // get data from req
  const { id } = req.params;
  const { reaction } = req.body;

  // add reaction
  await addReactionProvider(
    this.CommentRepository,
    id as string,
    req.user!._id as unknown as string ,
    reaction
  );

  // send response
  return res.sendStatus(204);
};

}

export default new CommentService()