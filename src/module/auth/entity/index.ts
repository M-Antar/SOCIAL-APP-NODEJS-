import { ENUM_ROLE, GENDER, USER_AGENT } from "../../../utils/common/enum";

export class User {
  public fullName!: string; // virtual
  public email!: string;
  public password!: string;
  public credentialUpdatedAt!: Date;
  public phoneNumber!: string;
  public role!: ENUM_ROLE;
  public gender!: GENDER;
  public userAgent!: USER_AGENT;
  public otp!: string;
  public otpExpiryAt!: Date;
  public isVerified!:boolean
}
