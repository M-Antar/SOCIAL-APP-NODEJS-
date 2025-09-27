import { Schema } from "mongoose"
import { IComment } from "./comment.interface"
import { reactionSchema } from "../common/reaction.schema"

export const commentSchema = new Schema<IComment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  parentId: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  content: { type: String },
  reactions: { type: [reactionSchema] }
}, { timestamps: true })
