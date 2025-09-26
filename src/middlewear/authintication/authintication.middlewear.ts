import { NextFunction, Request, Response } from "express";

import { UserRepository } from "../../DB/model/user/user.repository";
import { VerifyToken } from "../../utils/common/token";
import { NotFoundException } from "../../utils/common/error";



export const isAuth= ()=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization as string

    const payload = VerifyToken(token)

    const userRepository = new UserRepository()

   const user=  await userRepository.exist({_id:payload._id})

   if(!user){
    throw new NotFoundException("User Not Found")
   }

   req.user=user;

   next()

}
}