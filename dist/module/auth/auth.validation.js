"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmailSchema = exports.updateBasicSchema = exports.updatePasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const enum_1 = require("../../utils/common/enum");
exports.registerSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2).max(20),
    email: zod_1.z.email(),
    password: zod_1.z.string(),
    phoneNumber: zod_1.z.string(),
    gender: zod_1.z.enum(enum_1.GENDER),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string(),
});
exports.updatePasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    otp: zod_1.z.string().length(6, "OTP must be 6 digits"),
    newPassword: zod_1.z.string().min(4),
});
exports.updateBasicSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2).max(50).optional(),
    phoneNumber: zod_1.z.string().optional(),
    gender: zod_1.z.nativeEnum(enum_1.GENDER).optional(),
});
exports.updateEmailSchema = zod_1.z.object({
    oldEmail: zod_1.z.string().email(),
    newEmail: zod_1.z.string().email(),
    otp: zod_1.z.string().length(6, "OTP must be 6 digits"),
});
