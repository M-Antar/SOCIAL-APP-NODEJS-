import { Schema } from "mongoose";
import { IMessage } from "./message.interface";

export const messageSchema = new Schema<IMessage>(
  {
    content: String,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);