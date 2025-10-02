import {Express, Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AuthRouter,PostRouter,userRouter } from "./module";

import { connectDB } from "./DB/connection";
import { AppError } from "./utils/common/error";
import CommentRouter from "./module/comment/comment.controller";






export function bootstrap(app:Express,express:any){
    app.use(express.json())

    app.use("/auth",AuthRouter)
    app.use("/user",userRouter)
    app.use("/post",PostRouter)
    app.use("/comment",CommentRouter)

    


app.all("/{*dummy}",(req,res,next)=>{
    return res.status(404).json({message:"invalid router",success:false})
})

const globalHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500; // default to 500
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    errorDetails: err.errorDetails || [],
  });
};

 
app.use(globalHandler)
connectDB() // operation buffering
}