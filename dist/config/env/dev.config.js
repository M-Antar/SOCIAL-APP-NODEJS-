"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.devConfig = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    CLOUD_NAME: process.env.CLOUD_NAME,
    EMAIL: process.env.EMAIL,
    PASS: process.env.PASS,
    JWT_SECRET: process.env.JWT_SECRET
};
