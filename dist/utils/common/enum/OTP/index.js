"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExpireDate = exports.generateOTP = void 0;
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateOTP = generateOTP;
const generateExpireDate = (time) => {
    return Date.now() + time;
};
exports.generateExpireDate = generateExpireDate;
