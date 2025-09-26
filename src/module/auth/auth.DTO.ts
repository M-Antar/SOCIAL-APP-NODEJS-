import { GENDER } from "../../utils/common/enum";


export interface RegisterDTO {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  gender: GENDER;
}

export interface VerifyAccountDTO{
  email:string;
  otp:string;
}


export interface LLoginDTO{
  email:string,
  password:string
}
