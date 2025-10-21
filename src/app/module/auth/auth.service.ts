import envVars from "../../../config/envVars";
import { prisma } from "../../shared/pirsmaConfig";
import * as bcrypt from "bcrypt";
import { UserStatus} from "@prisma/client"
import jwt, {Secret, SignOptions} from "jsonwebtoken"
import { jwtHelper } from "../../helpers/jwtHelper";


const login = async (email:string, password:string) => {
const existedUser = await prisma.user.findUniqueOrThrow({
    where:{
        email,
        status:UserStatus.ACTIVE
    }
})

const isCorrectPassword = await bcrypt.compare(password, existedUser.password)
  if (!isCorrectPassword) {
    throw new Error("Password is incorrect")
  }
  const accessToken = jwtHelper.generateToken({email:existedUser.email, role:existedUser.role}, envVars.jwt.access_secret as string,envVars.jwt.access_expires as string
  )
  const refreshToken = jwtHelper.generateToken({email:existedUser.email, role:existedUser.role}, envVars.jwt.refresh_secret as string,envVars.jwt.refresh_expires as string
  )
  return {
    accessToken,
    refreshToken,
    needPasswordChange:existedUser.needPasswordChange
  }
};

export const authServices = {
  login,
};
