"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const console_1 = require("console");
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    await mongoose_1.default.connect(process.env.DB_URL).then(() => {
        (0, console_1.log)("DB connected successfully");
    }).catch(() => {
        (0, console_1.log)("Fail to connect to DB");
    });
};
exports.connectDB = connectDB;
