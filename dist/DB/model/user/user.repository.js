"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const abstractrepository_1 = require("../../abstractrepository");
const user_model_1 = require("./user.model");
class UserRepository extends abstractrepository_1.AbstractRepository {
    constructor() {
        super(user_model_1.User);
    }
    async getAllUsers() {
        return await this.model.find();
    }
}
exports.UserRepository = UserRepository;
