import { ObjectId } from "mongoose";
import { IAttachment, IReaction } from "../post/post.interface";

export interface IMessage {
  content: string;
  sender: ObjectId;
  attachments?: IAttachment[];
  reactions?: IReaction[];
}

export interface IChat {
  users: ObjectId[];
  messages: ObjectId[];
}