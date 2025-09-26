"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = exports.GenerateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dev_config_1 = require("../../../config/env/dev.config");
const GenerateToken = ({ payload, secretKey = dev_config_1.devConfig.JWT_SECRET, options, }) => {
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
exports.GenerateToken = GenerateToken;
const VerifyToken = (token, secretKey) => {
    const finalSecret = secretKey ?? dev_config_1.devConfig.JWT_SECRET;
    return jsonwebtoken_1.default.verify(token, finalSecret);
};
exports.VerifyToken = VerifyToken;
