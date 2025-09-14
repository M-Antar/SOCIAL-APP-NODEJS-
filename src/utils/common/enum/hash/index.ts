import bcryptjs from "bcryptjs"
export const generateHash = async (plainText:string)=>{
     return await bcryptjs.hash(plainText,10)
}

export const compareHash= async (password:string,hash:string)=>{
return await bcryptjs.compare(password,hash)
}