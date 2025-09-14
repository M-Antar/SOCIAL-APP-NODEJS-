import { Request, Response,NextFunction } from "express";
import { RegisterDTO } from "./auth.DTO";
import { User } from "../../DB/model/user/user.model";
import { BadRequestException, ConflictException } from "../../utils/common/enum/error";
import { UserRepository } from "../../DB/model/user/user.repository";
import { AuthFactoryService } from "./factory";
import * as authValidation from "./auth.validation"
import { log } from "console";
import { json } from "zod";

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


    return res.status(201).json({message:"User Created Successfully",success :true,data:createdUser})

    }
    
}