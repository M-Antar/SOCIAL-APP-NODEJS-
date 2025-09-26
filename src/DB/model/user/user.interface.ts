import { ObjectId, Types } from "mongoose";
import { ENUM_ROLE, GENDER, USER_AGENT } from "../../../utils/common/enum";

export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  fullName?: string; 
  email: string;
  password: string;
  credentialUpdatedAt: Date;
  phoneNumber?: string;
  role: ENUM_ROLE;
  gender: GENDER;
  userAgent: USER_AGENT;
  otp?:string;
  otpExpireAt:Date;
  isVerified:boolean
}