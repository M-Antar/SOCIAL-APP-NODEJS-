"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = void 0;
const mongoose_1 = require("mongoose");
const chat_schema_1 = require("./chat.schema");
exports.chat = (0, mongoose_1.model)("chat", chat_schema_1.chatSchema);
