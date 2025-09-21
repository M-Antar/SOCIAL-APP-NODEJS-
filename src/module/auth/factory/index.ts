import { RegisterDTO } from "../auth.DTO";
import { ENUM_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { generateHash } from "../../../utils/common/enum/hash";
import { generateExpireDate, generateOTP } from "../../../utils/common/enum/OTP";
import { User } from "../entity";

export class AuthFactoryService {
  async register(registerDTO: RegisterDTO) {
    const user = new User();
    user.fullName = registerDTO.fullName as string;
    user.email = registerDTO.email;
    user.password = await generateHash(registerDTO.password);
    user.phoneNumber = registerDTO.phoneNumber as string; // encrypt phone number
    user.otp = generateOTP() as unknown as string;
    user.otpExpiryAt = generateExpireDate(5*60*60*1000) as unknown as Date
    user.credentialUpdatedAt = Date.now() as unknown as Date
    user.gender = registerDTO.gender;
    user.role = ENUM_ROLE.user;
    user.userAgent = USER_AGENT.local;
    user.isVerified = false;

    return user
  }
}
