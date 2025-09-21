"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const error_1 = require("../../utils/common/enum/error");
const user_repository_1 = require("../../DB/model/user/user.repository");
const factory_1 = require("./factory");
const auth_provider_1 = require("./provider/auth.provider");
class AuthService {
    userRepository = new user_repository_1.UserRepository();
    authFactoryService = new factory_1.AuthFactoryService();
    constructor() {
    }
    register = async (req, res, next) => {
        const registerDTO = req.body;
        const userExist = await this.userRepository.exist({ email: registerDTO.email });
        if (userExist) {
            throw new error_1.ConflictException("User Already Exist");
        }
        // prepare
        const user = await this.authFactoryService.register(registerDTO);
        //save
        const createdUser = await this.userRepository.createItem(user);
        return res.status(201).json({ message: "User Created Successfully", success: true, data: { id: createdUser.id } });
    };
    verifyAccount = async (req, res) => {
        const verifyAccountDTO = req.body;
        await auth_provider_1.authProvider.checkOTP(verifyAccountDTO);
        await this.userRepository.update({ email: verifyAccountDTO.email }, {
            $set: { isVerified: true },
            $unset: { otp: "", otpExpiryAt: "" }
        });
        res.sendStatus(204);
    };
}
exports.AuthService = AuthService;
