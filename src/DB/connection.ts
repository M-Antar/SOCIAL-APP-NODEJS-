import { log } from "console"
import mongoose from "mongoose"

export const connectDB= async ()=>{
  await  mongoose.connect(process.env.DB_URL as string).then(()=>{
    log("DB connected successfully")
  }).catch(()=>{
    log("Fail to connect to DB")
  })
}