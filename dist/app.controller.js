"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const module_1 = require("./module");
const connection_1 = require("./DB/connection");
const comment_controller_1 = __importDefault(require("./module/comment/comment.controller"));
function bootstrap(app, express) {
    app.use(express.json());
    app.use("/auth", module_1.AuthRouter);
    app.use("/user", module_1.userRouter);
    app.use("/post", module_1.PostRouter);
    app.use("/comment", comment_controller_1.default);
    app.all("/{*dummy}", (req, res, next) => {
        return res.status(404).json({ message: "invalid router", success: false });
    });
    const globalHandler = (err, req, res, next) => {
        const status = err.statusCode || 500; // default to 500
        res.status(status).json({
            success: false,
            message: err.message || "Internal Server Error",
            errorDetails: err.errorDetails || [],
        });
    };
    app.use(globalHandler);
    (0, connection_1.connectDB)(); // operation buffering
}
