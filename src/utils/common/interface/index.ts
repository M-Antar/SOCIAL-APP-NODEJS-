import { Request, request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../../../DB/model/user/user.interface";

export interface IPayload extends JwtPayload {
  _id: string;
  role: string;
}

declare module "express" {
  interface Request {
    user?: IUser
  }
}
