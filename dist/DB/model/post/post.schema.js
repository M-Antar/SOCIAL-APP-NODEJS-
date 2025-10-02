"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const reaction_schema_1 = require("../common/reaction.schema");
const comment_model_1 = require("../comment/comment.model");
exports.postSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        trim: true,
    },
    reactions: [reaction_schema_1.reactionSchema],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.postSchema.virtual("comments", {
    localField: "_id",
    foreignField: "postId",
    ref: "Comment",
});
exports.postSchema.pre("deleteOne", async function (next) {
    const filter = typeof this.getFilter === "function" ? this.getFilter() : {};
    // if (!filter._id) return next();
    // const firstLayer = await Comment.find({ postId: filter._id , parentId:null});
    // if(firstLayer.length>0){
    //   for (const item of firstLayer) {
    //     await Comment.deleteOne({_id:item.id})
    //   }
    // }
    await comment_model_1.Comment.deleteMany({ postId: filter._id });
    next();
});
