import { Request, Response } from "express";
import { postRepository } from "../../DB/model/post/post.repository";
import { NotFoundException } from "../../utils/common/error";
import { CommentRepository } from "../../DB/model/comment/comment.repository";
import { IComment } from "../../DB/model/comment/comment.interface";
import { any } from "zod";
import { CommentFactoryService } from "./factory";
import { ICommentDTO } from "./comment.DTO";

class CommentService{

    private readonly postRepository = new postRepository()
    private readonly CommentRepository = new CommentRepository()
    private readonly commentFactoryService = new CommentFactoryService()




    addComment = async (req:Request,res:Response) => {
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

}

export default new CommentService()