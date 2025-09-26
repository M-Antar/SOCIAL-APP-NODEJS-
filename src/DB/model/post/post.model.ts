import { model } from "mongoose";
import { IPost } from "./post.interface";
import { postSchema } from "./post.schema";

export const Post = model<IPost>("Post",postSchema)
