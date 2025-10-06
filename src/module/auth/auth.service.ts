import { Request, Response,NextFunction } from "express";
import { LLoginDTO, RegisterDTO, UpdateEmail, UpdatePasswordDTO, UpdateUserDTO, VerifyAccountDTO } from "./auth.DTO";
import { User } from "../../DB/model/user/user.model";
import { UserRepository } from "../../DB/model/user/user.repository";
import { AuthFactoryService } from "./factory";
import * as authValidation from "./auth.validation"
import { log } from "console";
import { json } from "zod";
import bcryptjs from "bcryptjs"
import { authProvider } from "./provider/auth.provider";
import { compareHash, generateHash } from "../../utils/common/hash";
import { GenerateToken } from "../../utils/common/token";
import { BadRequestException, ConflictException, ForbiddentException, NotFoundException } from "../../utils/common/error";
import { generateExpireDate, generateOTP } from "../../utils/common/OTP";
import { sendMail } from "../../utils/common/email";

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

  const userExist = await this.userRepository.exist({ email: LoginDTO.email , isVerified:true})

  if (!userExist) {
    throw new ForbiddentException("Invalid Credintials")
  }
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

updatePass = async (req: Request, res: Response) => {
  const updatePassDTO: UpdatePasswordDTO = req.body;

  const userExist = await this.userRepository.exist({ email: updatePassDTO.email });
  if (!userExist) throw new NotFoundException("No user with this email");


  if (userExist.otp !== updatePassDTO.otp)
    throw new BadRequestException("Invalid OTP");

  
  if (userExist.otp && userExist.otpExpireAt < new Date())
    throw new BadRequestException("OTP expired");


  const hashedPass = await generateHash(updatePassDTO.newPassword);

  await this.userRepository.update(
    { email: updatePassDTO.email },
    {
      password: hashedPass,
      $unset: { otp: 1, otpExpiryAt: 1 },
    }
  )
  res.status(200).json({ message: "Password updated successfully" });
};

sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await this.userRepository.exist({ email });
  if (!user) throw new NotFoundException("No user with this email");


  const otp = generateOTP();
  const otpExpires = generateExpireDate(5 * 60 * 1000); 

  await this.userRepository.update(
    { email },
    { otp, otpExpires }
  );

    await sendMail({
    to: email,
    subject: "Password Reset OTP",
    html: `
        <p>Your OTP is: <b>${otp}</b></p>
        <p>This OTP will expire in 5 minutes.</p>
    `,
  })


  return res.status(200).json({ message: "OTP sent successfully" });
};

updateBasic = async (req: Request, res: Response) => {
  const updateUserDTO: UpdateUserDTO = req.body

  await this.userRepository.update(
    { email: req.user?.email },
    {
      fullName: updateUserDTO.fullName ?? req.user?.fullName,
      phoneNumber: updateUserDTO.phoneNumber ?? req.user?.phoneNumber,
      gender: updateUserDTO.gender ?? req.user?.gender,
    }
  )

  return res.status(200).json({ message: "User info updated successfully" })
}

updateEmail = async (req: Request, res: Response) => {
  const updateEmail :UpdateEmail = req.body;

  const oldUserExist = await this.userRepository.exist({email:updateEmail.oldEmail});
  const newEmailOkay = await this.userRepository.exist({email:updateEmail.newEmail});

  if(!oldUserExist) throw new NotFoundException("No user with this email");

  if(newEmailOkay) throw new BadRequestException("This email used before");

    if (oldUserExist.otp !== updateEmail.otp)
    throw new BadRequestException("Invalid OTP")

  if ( oldUserExist.otpExpireAt < new Date())
    throw new BadRequestException("OTP expired")

    await this.userRepository.update(
    { email: updateEmail.oldEmail },
    {
      email: updateEmail.newEmail,
      $unset: { otp: 1, otpExpiryAt: 1 },
    }
  )

  return res.status(200).json({message:"Email updated successfully"})
}

    
}