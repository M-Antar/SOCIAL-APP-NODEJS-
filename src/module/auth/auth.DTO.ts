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

export interface UpdatePasswordDTO {
  email: string
  otp: string
  newPassword: string
}

export interface UpdateUserDTO {
  fullName?: string
  phoneNumber?: string
  gender?: string
}

export interface UpdateEmail {
  oldEmail: string
  newEmail: string
  otp:string
}
