import {email, z} from "zod"
import { GENDER, USER_AGENT } from "../../utils/common/enum"
import { IUser } from "../../DB/model/user/user.interface"
import { LLoginDTO, RegisterDTO } from "./auth.DTO"


export const registerSchema = z.object<RegisterDTO>({
    fullName:z.string().min(2).max(20)as unknown as string,
    email:z.email() as unknown as string,
    password:z.string() as unknown as string,
    phoneNumber:z.string() as unknown as string,
    gender:z.enum(GENDER) as unknown as GENDER,
})

export const loginSchema = z.object<LLoginDTO>({
    email:z.email() as unknown as string,
    password:z.string() as unknown as string,
})

export const updatePasswordSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(4),
})

export const updateBasicSchema = z.object({
  fullName: z.string().min(2).max(50).optional(),
  phoneNumber: z.string().optional(),
  gender: z.nativeEnum(GENDER).optional(),
})

export const updateEmailSchema = z.object({
  oldEmail: z.string().email(),
  newEmail: z.string().email(),
  otp: z.string().length(6, "OTP must be 6 digits"),
})