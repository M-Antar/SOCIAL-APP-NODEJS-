"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_repository_1 = require("../../DB/model/chat/chat.repository");
class ChatService {
    chatRepository = new chat_repository_1.ChatRepository();
    getChat = async (req, res) => {
        const { userId } = req.params;
        const userLoginId = req.user?._id;
        const chat = await this.chatRepository.getOne({
            users: { $all: [userId, userLoginId] },
        }, {}, { populate: "messages" });
        return res.json({
            message: 'done',
            success: true,
            data: { chat },
        });
    };
}
exports.default = new ChatService();
