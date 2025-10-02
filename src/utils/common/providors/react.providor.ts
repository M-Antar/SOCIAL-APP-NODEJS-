import { CommentRepository } from "../../../DB/model/comment/comment.repository";
import { postRepository } from "../../../DB/model/post/post.repository";
import { NotFoundException } from "../error";

export const addReactionProvider = async (
  repo: CommentRepository | postRepository,
  id: string,
  userId: string,
  reaction?: string
) => {
  const entity = await repo.getOne({ _id: id }); // use a method that returns doc
  if (!entity) throw new NotFoundException("Not found");

  const userReactedIndex = entity.reactions.findIndex(
    r => r.userId.toString() === userId.toString()
  );

  if (userReactedIndex === -1) {
    if (!reaction) return; // nothing to add if no reaction provided
    await repo.update(
      { _id: id },
      { $push: { reactions: { reaction, userId } } }
    );
  } else {
    if (!reaction) {
      await repo.update(
        { _id: id },
        { $pull: { reactions: { userId } } }
      );
    } else {
      await repo.update(
        { _id: id, "reactions.userId": userId },
        { $set: { "reactions.$.reaction": reaction } }
      );
    }
  }
};
