"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const message_repository_1 = require("../../DB/model/message/message.repository");
const chat_repository_1 = require("../../DB/model/chat/chat.repository");
const sendMessage = (socket, io, connectedUsers) => {
    return async (data) => {
        const destSockset = connectedUsers.get(data.destId);
        io.send("successMessage", data);
        io.to(destSockset).emit("receiveMessage");
        const messageRepository = new message_repository_1.MessageRepository();
        const sender = socket.data.user.id;
        const createdMessage = await messageRepository.createItem({ content: data.message, sender: sender });
        const chatRepository = new chat_repository_1.ChatRepository();
        const chat = await chatRepository.getOne({ users: { $all: [sender, data.destId] } });
        if (!chat) {
            await chatRepository.createItem({ users: [sender, data.destId], messages: [createdMessage._id] });
        }
        else {
            await chatRepository.update({ _id: chat._id }, { $push: { messages: createdMessage._id } });
        }
    };
};
exports.sendMessage = sendMessage;
