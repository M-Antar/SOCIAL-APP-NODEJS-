"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketAuth = void 0;
const token_1 = require("../../utils/common/token");
const user_repository_1 = require("../../DB/model/user/user.repository");
const error_1 = require("../../utils/common/error");
const socketAuth = async (socket, next) => {
    try {
        const { authorization } = socket.handshake.auth;
        if (!authorization)
            throw new Error("No token provided");
        // Remove "Bearer " if exists
        const token = authorization.startsWith("Bearer ")
            ? authorization.split(" ")[1]
            : authorization;
        const payload = (0, token_1.VerifyToken)(token);
        const userRepository = new user_repository_1.UserRepository();
        const user = await userRepository.getOne({ _id: payload._id });
        if (!user)
            throw new error_1.NotFoundException("user not found");
        socket.data.user = user;
        next();
    }
    catch (error) {
        next(new Error("invalid token"));
    }
};
exports.socketAuth = socketAuth;
