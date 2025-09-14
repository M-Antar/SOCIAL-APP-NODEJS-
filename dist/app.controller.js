"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const module_1 = require("./module");
const connection_1 = require("./DB/connection");
function bootstrap(app, express) {
    app.use(express.json());
    app.use("/auth", module_1.AuthRouter);
    app.use("/user", module_1.userRouter);
    app.all("/{*dummy}", (req, res, next) => {
        return res.status(404).json({ message: "invalid router", success: false });
    });
    const globalHandler = (err, req, res, next) => {
        res.status(err.statusCode).json({
            success: false,
            message: err.message || "Internal Server Error",
            errorDetails: err.errorDetails
        });
    };
    app.use(globalHandler);
    (0, connection_1.connectDB)(); // operation buffering
}
