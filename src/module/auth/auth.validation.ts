import {email, z} from "zod"
import { GENDER, USER_AGENT } from "../../utils/common/enum"
import { IUser } from "../../DB/model/user/user.interface"
import { RegisterDTO } from "./auth.DTO"


export const registerSchema = z.object<RegisterDTO>({
    fullName:z.string().min(2).max(20)as unknown as string,
    email:z.email() as unknown as string,
    password:z.string() as unknown as string,
    phoneNumber:z.string() as unknown as string,
    gender:z.enum(GENDER) as unknown as GENDER,
})