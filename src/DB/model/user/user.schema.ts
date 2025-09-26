import { Schema } from "mongoose";
import { IUser } from "./user.interface";
import { Timestamp } from "bson";
import { ENUM_ROLE, GENDER, USER_AGENT } from "../../../utils/common/enum";
import { sendMail } from "../../../utils/common/email";


export const userSchema = new Schema<IUser>({
  firstName: { type: String, minLength: 3, maxLength: 20, required: true, trim: true },
  lastName: { type: String, minLength: 3, maxLength: 20, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  password: {
    type: String,
    required: function () {
      if (this.userAgent == "google") {
        return false
      }
      else
        return true
    },
    trim: true,
  },
  credentialUpdatedAt: Date,
  phoneNumber: String,
  role: { type: String, enum: ENUM_ROLE, default: ENUM_ROLE.user },
  gender: { type: String, enum: GENDER, default: GENDER.male },
  userAgent: { type: String, enum: USER_AGENT, default: USER_AGENT.local },
  otp:{type:String},
  otpExpireAt:{type:Date},
  isVerified:{type:Boolean,default:false}
}, { timestamps: true ,toJSON:{virtuals:true} ,toObject:{virtuals:true }})

userSchema.virtual("fullName").get(function (){
    return this.firstName+" "+this.lastName
}).set(function (value:string){
    const [firstName , lastName ] = value.split(" ")
    this.firstName =firstName as string;
    this.lastName =lastName as string;
})


userSchema.pre("save",{document:true,query:false},async function(){
  if(this.userAgent != USER_AGENT.google && this.isNew == true){
    await sendMail({to:this.email,subject:"Confirm Email",html:`<h1>Your OTP Is ${this.otp}</h1>`})
  }
  
}) //when resolve will go to next() auto