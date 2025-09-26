"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const user_repository_1 = require("../../DB/model/user/user.repository");
const token_1 = require("../../utils/common/token");
const error_1 = require("../../utils/common/error");
const isAuth = () => {
    return async (req, res, next) => {
        const token = req.headers.authorization;
        const payload = (0, token_1.VerifyToken)(token);
        const userRepository = new user_repository_1.UserRepository();
        const user = await userRepository.exist({ _id: payload._id });
        if (!user) {
            throw new error_1.NotFoundException("User Not Found");
        }
        req.user = user;
        next();
    };
};
exports.isAuth = isAuth;
