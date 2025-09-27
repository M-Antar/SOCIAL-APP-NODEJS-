    import { Schema } from "mongoose";
    import { REACTION } from "../../../utils/common/enum";
    import { IReaction } from "../post/post.interface";


    export const reactionSchema = new Schema<IReaction>({
    reaction:{type:Number,
        enum:REACTION,
    set:(value:Number) => Number(value)}
        ,
    userId:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
    }
    },{timestamps:true})
