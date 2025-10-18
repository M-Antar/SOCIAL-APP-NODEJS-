"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const abstractrepository_1 = require("../../abstractrepository");
const message_model_1 = require("./message.model");
class MessageRepository extends abstractrepository_1.AbstractRepository {
    constructor() {
        super(message_model_1.message);
    }
}
exports.MessageRepository = MessageRepository;
