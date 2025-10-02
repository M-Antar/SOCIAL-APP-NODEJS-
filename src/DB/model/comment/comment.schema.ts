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
    ref: "Post"
  },
  parentId: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  content: { type: String },
  reactions: { type: [reactionSchema] }
}, { timestamps: true ,toJSON:{virtuals:true},toObject:{virtuals:true}})

commentSchema.virtual('replies',{
  ref:"Comment",
  localField:"_id",
  foreignField:"parentId"
})


commentSchema.pre("deleteOne", { document: false, query: true }, async function (next) {
  const filter = this.getFilter?.() || {};
  const commentId = filter._id;

  if (!commentId) return next();

  const replies = await this.model.find({ parentId: commentId });

  for (const reply of replies) {
    await this.model.deleteOne({ _id: reply._id });
  }

  next();
});

