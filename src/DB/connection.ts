import { log } from "console"
import mongoose from "mongoose"
import { devConfig } from "../config/env/dev.config"

export const connectDB= async ()=>{
  await  mongoose.connect(devConfig.DB_URL as string).then(()=>{
    log("DB connected successfully")
  }).catch(()=>{
    log("Fail to connect to DB")
  })
}