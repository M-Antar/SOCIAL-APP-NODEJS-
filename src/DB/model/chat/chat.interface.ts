import { ObjectId } from "mongoose";


export interface IChat {
  users: ObjectId[];
  messages: ObjectId[];
}