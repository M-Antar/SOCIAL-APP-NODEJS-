"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const mongoose_1 = require("mongoose");
const reaction_schema_1 = require("../common/reaction.schema");
exports.commentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post"
    },
    parentId: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    content: { type: String },
    reactions: { type: [reaction_schema_1.reactionSchema] }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.commentSchema.virtual('replies', {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentId"
});
exports.commentSchema.pre("deleteOne", { document: false, query: true }, async function (next) {
    const filter = this.getFilter?.() || {};
    const commentId = filter._id;
    if (!commentId)
        return next();
    const replies = await this.model.find({ parentId: commentId });
    for (const reply of replies) {
        await this.model.deleteOne({ _id: reply._id });
    }
    next();
});
