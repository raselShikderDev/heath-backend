import { SignApiOptions } from "cloudinary";
import jwt, { Secret } from "jsonwebtoken";

 const generateToken = (payload:any, secret:Secret, expiresIn:string)=>{
    const token = jwt.sign(payload, secret,{
         algorithm:"HS256",
         expiresIn
    } as SignApiOptions)
    return token
}

export const jwtHelper = {
    generateToken
}