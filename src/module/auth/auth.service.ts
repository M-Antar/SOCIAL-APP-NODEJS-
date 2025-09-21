import { Request, Response,NextFunction } from "express";
import { RegisterDTO, VerifyAccountDTO } from "./auth.DTO";
import { User } from "../../DB/model/user/user.model";
import { BadRequestException, ConflictException, NotFoundException } from "../../utils/common/enum/error";
import { UserRepository } from "../../DB/model/user/user.repository";
import { AuthFactoryService } from "./factory";
import * as authValidation from "./auth.validation"
import { log } from "console";
import { json } from "zod";
import { sendMail } from "../../utils/common/enum/email";
import { authProvider } from "./provider/auth.provider";

export class AuthService {
private userRepository = new UserRepository()
private authFactoryService = new AuthFactoryService()
constructor(){

}
 register = async (req:Request,res:Response,next:NextFunction)=>{

     const registerDTO :RegisterDTO = req.body   

    const userExist = await this.userRepository.exist({email:registerDTO.email})

    if(userExist){
    throw new ConflictException("User Already Exist")
    }

    // prepare
     const user = await this.authFactoryService.register(registerDTO)


    //save
   const createdUser = await this.userRepository.createItem(user)




    return res.status(201).json({message:"User Created Successfully",success :true,data:{id:createdUser.id}})

    }


 verifyAccount = async (req: Request, res: Response) => {

  const verifyAccountDTO:VerifyAccountDTO = req.body;
 await authProvider.checkOTP(verifyAccountDTO)

await this.userRepository.update(
  { email: verifyAccountDTO.email },
  {
    $set: { isVerified: true },
    $unset: { otp: "", otpExpiryAt: "" }
  }
);
  res.sendStatus(204)
};
    
}