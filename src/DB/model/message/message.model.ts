import { model } from "mongoose";
import { messageSchema } from "./message.schema";

export const message =  model("message",messageSchema)