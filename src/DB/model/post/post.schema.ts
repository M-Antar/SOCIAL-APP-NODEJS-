import mongoose, { Schema } from "mongoose";
import { IPost, IReaction } from "./post.interface";
import { REACTION } from "../../../utils/common/enum";

const reactionSchema = new Schema<IReaction>({
  reaction:{type:Number,enum:REACTION,default:REACTION.like},
  userId:{
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true,
  }
},{timestamps:true})

export const postSchema = new Schema<IPost>({
  userId: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  content: {
    type: String,
    // required:function(){
    //     if(this.attachments?.length) return false
    //     return true
    // },
    trim: true,
  },
  reactions:[reactionSchema]
});
