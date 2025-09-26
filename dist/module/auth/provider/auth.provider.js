"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProvider = void 0;
const user_repository_1 = require("../../../DB/model/user/user.repository");
const error_1 = require("../../../utils/common/error");
exports.authProvider = {
    async checkOTP(verifyAccountDTO) {
        const userRepository = new user_repository_1.UserRepository();
        const userExist = await userRepository.exist({
            email: verifyAccountDTO.email,
        });
        if (!userExist) {
            throw new error_1.NotFoundException("User not found");
        }
        if (userExist.otp !== verifyAccountDTO.otp) {
            throw new error_1.BadRequestException("Invalid OTP");
        }
        if (userExist.otpExpireAt < new Date()) {
            throw new error_1.BadRequestException("Expired OTP");
        }
    },
    async updateUser(filter, update) {
        const userRepository = new user_repository_1.UserRepository();
        return await userRepository.update(filter, update);
    },
};
