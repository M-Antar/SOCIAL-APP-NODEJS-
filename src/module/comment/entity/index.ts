import { Types } from "mongoose"
import { IAttachment, IReaction } from "../../../DB/model/post/post.interface"

export class Comment {
  userId?: Types.ObjectId
  postId?: Types.ObjectId
  parentId?: Types.ObjectId
  content?: string
  attachment?: IAttachment
  reactions?: IReaction[]
}
