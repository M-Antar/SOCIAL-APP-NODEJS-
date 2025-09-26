"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../utils/common/enum");
const reactionSchema = new mongoose_1.Schema({
    reaction: { type: Number, enum: enum_1.REACTION, default: enum_1.REACTION.like },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });
exports.postSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
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
    reactions: [reactionSchema]
});
