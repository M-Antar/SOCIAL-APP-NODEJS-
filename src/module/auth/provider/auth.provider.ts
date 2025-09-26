import { FilterQuery } from "mongoose";
import { UserRepository } from "../../../DB/model/user/user.repository";
import { VerifyAccountDTO } from "../auth.DTO";
import { IUser } from "../../../DB/model/user/user.interface";
import { BadRequestException, NotFoundException } from "../../../utils/common/error";

export const authProvider = {
    async checkOTP(verifyAccountDTO:VerifyAccountDTO){

    const userRepository = new UserRepository()
    const userExist = await  userRepository.exist({
    email: verifyAccountDTO.email,
  });

  if (!userExist) {
    throw new NotFoundException("User not found");
  }

  
  if (userExist.otp !== verifyAccountDTO.otp) {
    throw new BadRequestException("Invalid OTP");
  }

  if(userExist.otpExpireAt< new Date()){
    throw new BadRequestException("Expired OTP")
  }
},

 async updateUser (filter: FilterQuery<IUser>, update: any): Promise<any> {
    const userRepository = new UserRepository();
    return await userRepository.update(filter, update);
  },
}