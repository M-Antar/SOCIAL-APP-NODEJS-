"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_repository_1 = require("../../DB/model/user/user.repository");
const factory_1 = require("./factory");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_provider_1 = require("./provider/auth.provider");
const hash_1 = require("../../utils/common/hash");
const token_1 = require("../../utils/common/token");
const error_1 = require("../../utils/common/error");
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
    login = async (req, res) => {
        const LoginDTO = req.body;
        const userExist = await this.userRepository.exist({ email: LoginDTO.email });
        if (!userExist) {
            throw new error_1.ForbiddentException("Invalid Credintials");
        }
        console.log("Entered password:", LoginDTO.password);
        console.log("Hashed password from DB:", userExist.password);
        console.log("Match:", await bcryptjs_1.default.compare(LoginDTO.password, userExist.password));
        const isMatch = await (0, hash_1.compareHash)(LoginDTO.password, userExist.password);
        if (!isMatch) {
            throw new error_1.ForbiddentException("Invalid Credentials");
        }
        const accessToken = (0, token_1.GenerateToken)({
            payload: { _id: userExist._id, role: userExist.role },
            options: { expiresIn: "1d" }
        });
        return res.status(200).json({
            message: "login success",
            success: true,
            data: { accessToken }
        });
    };
}
exports.AuthService = AuthService;
