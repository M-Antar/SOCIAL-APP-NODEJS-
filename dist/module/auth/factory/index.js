"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFactoryService = void 0;
const enum_1 = require("../../../utils/common/enum");
const entity_1 = require("../entity");
const hash_1 = require("../../../utils/common/hash");
const OTP_1 = require("../../../utils/common/OTP");
class AuthFactoryService {
    async register(registerDTO) {
        const user = new entity_1.User();
        user.fullName = registerDTO.fullName;
        user.email = registerDTO.email;
        user.password = await (0, hash_1.generateHash)(registerDTO.password);
        user.phoneNumber = registerDTO.phoneNumber; // encrypt phone number
        user.otp = (0, OTP_1.generateOTP)();
        user.otpExpiryAt = (0, OTP_1.generateExpireDate)(5 * 60 * 60 * 1000);
        user.credentialUpdatedAt = Date.now();
        user.gender = registerDTO.gender;
        user.role = enum_1.ENUM_ROLE.user;
        user.userAgent = enum_1.USER_AGENT.local;
        user.isVerified = false;
        return user;
    }
}
exports.AuthFactoryService = AuthFactoryService;
