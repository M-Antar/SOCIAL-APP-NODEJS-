import { model } from "mongoose";
import { userSchema } from "./user.schema";
import { IUser } from "./user.interface";

export const User = model<IUser>("User",userSchema)