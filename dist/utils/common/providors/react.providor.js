"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReactionProvider = void 0;
const error_1 = require("../error");
const addReactionProvider = async (repo, id, userId, reaction) => {
    const entity = await repo.getOne({ _id: id }); // use a method that returns doc
    if (!entity)
        throw new error_1.NotFoundException("Not found");
    const userReactedIndex = entity.reactions.findIndex(r => r.userId.toString() === userId.toString());
    if (userReactedIndex === -1) {
        if (!reaction)
            return; // nothing to add if no reaction provided
        await repo.update({ _id: id }, { $push: { reactions: { reaction, userId } } });
    }
    else {
        if (!reaction) {
            await repo.update({ _id: id }, { $pull: { reactions: { userId } } });
        }
        else {
            await repo.update({ _id: id, "reactions.userId": userId }, { $set: { "reactions.$.reaction": reaction } });
        }
    }
};
exports.addReactionProvider = addReactionProvider;
