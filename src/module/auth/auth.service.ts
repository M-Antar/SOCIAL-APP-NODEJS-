import { Request, Response,NextFunction } from "express";
import { LLoginDTO, RegisterDTO, VerifyAccountDTO } from "./auth.DTO";
import { User } from "../../DB/model/user/user.model";
import { UserRepository } from "../../DB/model/user/user.repository";
import { AuthFactoryService } from "./factory";
import * as authValidation from "./auth.validation"
import { log } from "console";
import { json } from "zod";
import bcryptjs from "bcryptjs"
import { authProvider } from "./provider/auth.provider";
import { compareHash } from "../../utils/common/hash";
import { GenerateToken } from "../../utils/common/token";
import { ConflictException, ForbiddentException } from "../../utils/common/error";

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

login = async (req: Request, res: Response) => {

  const LoginDTO: LLoginDTO = req.body

  const userExist = await this.userRepository.exist({ email: LoginDTO.email })

  if (!userExist) {
    throw new ForbiddentException("Invalid Credintials")
  }
  
  console.log("Entered password:", LoginDTO.password)
  console.log("Hashed password from DB:", userExist.password)
   console.log("Match:", await bcryptjs.compare(LoginDTO.password, userExist.password))

const isMatch = await compareHash(LoginDTO.password, userExist.password);
if (!isMatch) {
  throw new ForbiddentException("Invalid Credentials");
}
  const accessToken = GenerateToken({
    payload: { _id: userExist._id, role: userExist.role },
    options: { expiresIn: "1d" }
  })

  return res.status(200).json({
    message: "login success",
    success: true,
    data: { accessToken }
  })
}

    
}