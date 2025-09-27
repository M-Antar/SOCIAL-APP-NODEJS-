"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../utils/common/enum");
exports.reactionSchema = new mongoose_1.Schema({
    reaction: { type: Number,
        enum: enum_1.REACTION,
        set: (value) => Number(value) },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });
