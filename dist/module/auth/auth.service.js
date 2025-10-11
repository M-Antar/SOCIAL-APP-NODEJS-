"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_repository_1 = require("../../DB/model/user/user.repository");
const factory_1 = require("./factory");
const auth_provider_1 = require("./provider/auth.provider");
const hash_1 = require("../../utils/common/hash");
const token_1 = require("../../utils/common/token");
const error_1 = require("../../utils/common/error");
const OTP_1 = require("../../utils/common/OTP");
const email_1 = require("../../utils/common/email");
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
        const userExist = await this.userRepository.exist({ email: LoginDTO.email, isVerified: true });
        if (!userExist) {
            throw new error_1.ForbiddentException("Invalid Credintials");
        }
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
    updatePass = async (req, res) => {
        const updatePassDTO = req.body;
        const userExist = await this.userRepository.exist({ email: updatePassDTO.email });
        if (!userExist)
            throw new error_1.NotFoundException("No user with this email");
        if (userExist.otp !== updatePassDTO.otp)
            throw new error_1.BadRequestException("Invalid OTP");
        if (userExist.otp && userExist.otpExpireAt < new Date())
            throw new error_1.BadRequestException("OTP expired");
        const hashedPass = await (0, hash_1.generateHash)(updatePassDTO.newPassword);
        await this.userRepository.update({ email: updatePassDTO.email }, {
            password: hashedPass,
            $unset: { otp: 1, otpExpiryAt: 1 },
        });
        res.status(200).json({ message: "Password updated successfully" });
    };
    sendOtp = async (req, res) => {
        const { email } = req.body;
        const user = await this.userRepository.exist({ email });
        if (!user)
            throw new error_1.NotFoundException("No user with this email");
        const otp = (0, OTP_1.generateOTP)();
        const otpExpires = (0, OTP_1.generateExpireDate)(5 * 60 * 1000);
        await this.userRepository.update({ email }, { otp, otpExpires });
        await (0, email_1.sendMail)({
            to: email,
            subject: "Password Reset OTP",
            html: `
        <p>Your OTP is: <b>${otp}</b></p>
        <p>This OTP will expire in 5 minutes.</p>
    `,
        });
        return res.status(200).json({ message: "OTP sent successfully" });
    };
    updateBasic = async (req, res) => {
        const updateUserDTO = req.body;
        // 1. Fetch the user document
        const user = await this.userRepository.exist({ email: req.user?.email });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        // 2. Update fields on the document instance
        user.fullName = (updateUserDTO.fullName ?? user.fullName);
        user.phoneNumber = (updateUserDTO.phoneNumber ?? user.phoneNumber);
        user.gender = (updateUserDTO.gender ?? user.gender);
        // 3. Save the document (this triggers hooks & recomputes virtuals)
        await user.save();
        // 4. Return the updated document with virtual fields
        return res.status(200).json({
            message: "User info updated successfully",
        });
    };
    updateEmail = async (req, res) => {
        const updateEmail = req.body;
        const oldUserExist = await this.userRepository.exist({ email: updateEmail.oldEmail });
        const newEmailOkay = await this.userRepository.exist({ email: updateEmail.newEmail });
        if (!oldUserExist)
            throw new error_1.NotFoundException("No user with this email");
        if (newEmailOkay)
            throw new error_1.BadRequestException("This email used before");
        if (oldUserExist.otp !== updateEmail.otp)
            throw new error_1.BadRequestException("Invalid OTP");
        if (oldUserExist.otpExpireAt < new Date())
            throw new error_1.BadRequestException("OTP expired");
        await this.userRepository.update({ email: updateEmail.oldEmail }, {
            email: updateEmail.newEmail,
            $unset: { otp: 1, otpExpiryAt: 1 },
        });
        return res.status(200).json({ message: "Email updated successfully" });
    };
}
exports.AuthService = AuthService;
