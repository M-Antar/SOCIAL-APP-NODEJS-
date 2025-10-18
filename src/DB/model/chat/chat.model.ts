import { model } from "mongoose";
import { chatSchema } from "./chat.schema";


export const chat =  model("chat",chatSchema)