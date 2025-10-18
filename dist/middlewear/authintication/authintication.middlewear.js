"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const user_repository_1 = require("../../DB/model/user/user.repository");
const token_1 = require("../../utils/common/token");
const error_1 = require("../../utils/common/error");
const isAuth = () => {
    return async (req, res, next) => {
        console.log(req.headers.authorization);
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1]; // remove Bearer
        const payload = (0, token_1.VerifyToken)(token);
        const userRepository = new user_repository_1.UserRepository();
        const user = await userRepository.getOne({ _id: payload._id }, {}, { populate: [{ path: "friends", select: "firstName lastName" }] });
        if (!user) {
            throw new error_1.NotFoundException("User Not Found");
        }
        req.user = user;
        console.log("✅ Auth middleware passed:", user._id);
        next();
    };
};
exports.isAuth = isAuth;
