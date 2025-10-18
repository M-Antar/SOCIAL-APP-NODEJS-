"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = void 0;
const mongoose_1 = require("mongoose");
const message_schema_1 = require("./message.schema");
exports.message = (0, mongoose_1.model)("message", message_schema_1.messageSchema);
