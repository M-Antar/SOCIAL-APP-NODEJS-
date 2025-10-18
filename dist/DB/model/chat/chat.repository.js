"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const abstractrepository_1 = require("../../abstractrepository");
const chat_model_1 = require("./chat.model");
class ChatRepository extends abstractrepository_1.AbstractRepository {
    constructor() {
        super(chat_model_1.chat);
    }
}
exports.ChatRepository = ChatRepository;
