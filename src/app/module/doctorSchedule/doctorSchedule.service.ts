import envVars from "../../../config/envVars";
import { prisma } from "../../shared/pirsmaConfig";
import * as bcrypt from "bcrypt";
import { Prisma, UserStatus } from "@prisma/client"
import jwt, { Secret, SignOptions } from "jsonwebtoken"
import { jwtHelper } from "../../helpers/jwtHelper";
import { IJWTPayload } from "../../types/common";

// Create doctor schedules
const insertIntoDB = async (user: IJWTPayload, payload: {
  schedulesIds: string[]
}) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email
    }
  })
  const doctorScheduleData = payload.schedulesIds.map((scheduleId)=>({
    doctorId: doctorData.id,
    scheduleId
  }))


//   {
//   "schedulesIds": ["5b1ae1ea-c4d9-48b3-92eb-84085ee7c5b4", "b6f05136-a646-4008-ae72-9bbe80ee6cf6", "49e3d4d8-0bc2-41de-be5f-2d35817ddfa9"]
// }

 return await prisma.doctorSchedules.createMany({
    data:doctorScheduleData
  })
  
};

export const doctorScheduleServices = {
  insertIntoDB,
};
