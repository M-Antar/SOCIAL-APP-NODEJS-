import { ObjectId, Types } from "mongoose";
import { IAttachment, IReaction } from "../../../DB/model/post/post.interface";

export class Post{
    public userId!:Types.ObjectId;
    public content!:string;
    public reactions!:IReaction[];
    public attachments!:IAttachment[];
}