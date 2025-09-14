"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../../DB/model/user/user.repository");
class UserService {
    userRepository = new user_repository_1.UserRepository();
    constructor() { }
    getProfile = async (req, res, next) => {
        let user = await this.userRepository.getOne({ _id: req.params.id });
        return res
            .status(200)
            .json({ message: "done", success: true, data: { user } });
    };
}
exports.UserService = UserService;
