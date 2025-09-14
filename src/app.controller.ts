import {Express, Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AuthRouter,userRouter } from "./module";

import { connectDB } from "./DB/connection";
import { AppError } from "./utils/common/enum/error";





export function bootstrap(app:Express,express:any){
    app.use(express.json())

    app.use("/auth",AuthRouter)
    app.use("/user",userRouter)

    


app.all("/{*dummy}",(req,res,next)=>{
    return res.status(404).json({message:"invalid router",success:false})
})

const globalHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errorDetails:err.errorDetails
    
  });
};
 
app.use(globalHandler)
connectDB() // operation buffering
}