import { Types } from "mongoose"
import { IAttachment, IReaction } from "../post/post.interface"

export interface IComment {
  _id: Types.ObjectId
  userId: Types.ObjectId
  postId: Types.ObjectId
  parentId: Types.ObjectId|null
  content: string
  attachment?: IAttachment
  reactions: IReaction[]
}
