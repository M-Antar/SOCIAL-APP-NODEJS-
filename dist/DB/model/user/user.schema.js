"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../utils/common/enum");
exports.userSchema = new mongoose_1.Schema({
    firstName: { type: String, minLength: 3, maxLength: 20, required: true, trim: true },
    lastName: { type: String, minLength: 3, maxLength: 20, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: {
        type: String,
        required: function () {
            if (this.userAgent == "google") {
                return false;
            }
            else
                return true;
        },
        lowercase: true,
        trim: true,
    },
    credentialUpdatedAt: Date,
    phoneNumber: String,
    role: { type: String, enum: enum_1.ENUM_ROLE, default: enum_1.ENUM_ROLE.user },
    gender: { type: String, enum: enum_1.GENDER, default: enum_1.GENDER.male },
    userAgent: { type: String, enum: enum_1.USER_AGENT, default: enum_1.USER_AGENT.local },
    otp: { type: Date },
    otpExpire: { type: Date }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.userSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
}).set(function (value) {
    const [firstName, lastName] = value.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
});
