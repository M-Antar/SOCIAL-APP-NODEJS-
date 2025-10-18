"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const middlewears_1 = require("./middlewears");
const chat_1 = require("./chat");
const connectedUsers = new Map();
const initSocket = (server) => {
    const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
    io.use(middlewears_1.socketAuth);
    io.on("conection", (socket) => {
        connectedUsers.set(socket.data.user.id, socket.id);
        console.log(connectedUsers);
        console.log("new user connected");
        io.on("sendMessage", (0, chat_1.sendMessage)(socket, io, connectedUsers)); //cb and (data)=>{} as front send 1 param
    });
};
exports.initSocket = initSocket;
