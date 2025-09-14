"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const error_1 = require("../../utils/common/enum/error");
const isValid = (schema) => {
    return (req, res, next) => {
        const data = { ...req.body, ...req.params, ...req.query };
        const result = schema.safeParse(data);
        if (!result.success) {
            const errorMessages = result.error.issues.map(issue => ({
                path: issue.path[0],
                message: issue.message,
            }));
            throw new error_1.BadRequestException("Validation Error", errorMessages);
        }
        next();
    };
};
exports.isValid = isValid;
