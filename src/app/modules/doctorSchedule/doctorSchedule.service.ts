import httpsStatus from "http-status"
import { prisma } from "../../shared/pirsmaConfig";
import { Prisma, UserRole, UserStatus } from "@prisma/client"
import { IJWTPayload } from "../../types/common";
import { IOptions, pagginationHelper } from "../../helpers/pagginationHelper";
import apiError from "../../errors/apiError";

// Create doctor schedules
const createDoctorSchedules = async (user: IJWTPayload, payload: {
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



const myDoctorAllSchedules = async (user: IJWTPayload, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } = pagginationHelper.calculatePaggination(options);
  const andConditions: Prisma.DoctorSchedulesWhereInput[] = []

  if (user.role !== UserRole.DOCTOR) {
     throw new apiError(httpsStatus.UNAUTHORIZED, "You are not authorized")
  } 

  const isDoctor = await prisma.doctor.findUniqueOrThrow({
    where:{
        email:user.email
    }
  })

  const whereConditions: Prisma.DoctorSchedulesWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.doctorSchedules.findMany({
    skip,
    take: skip,
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder
    },
    include: { 
      schedule: true
     }
  })

  const total = await prisma.doctorSchedules.count({
    where: whereConditions
  })
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
}


const getAllDoctorSchedules = async (user: IJWTPayload, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } = pagginationHelper.calculatePaggination(options);
  const andConditions: Prisma.DoctorSchedulesWhereInput[] = []

  if (user.role !== UserRole.ADMIN) {
     throw new apiError(httpsStatus.UNAUTHORIZED, "You are not authorized")
  } 

  const isAdmin = await prisma.admin.findUniqueOrThrow({
    where:{
        email:user.email
    }
  })


  const whereConditions: Prisma.DoctorSchedulesWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}


  const result = await prisma.doctorSchedules.findMany({
    skip,
    take: skip,
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder
    },
    include: { schedule: true ,doctor: true }
  })

  const total = await prisma.doctorSchedules.count({
    where: whereConditions
  })
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
}


const deleteDoctorSchedules = async (user: IJWTPayload, scheduleId:string) => {
  
  if (user.role !== UserRole.DOCTOR) {
     throw new apiError(httpsStatus.UNAUTHORIZED, "You are not authorized")
  }

  const existingDoctor = await prisma.doctor.findUniqueOrThrow({
    where:{
        email:user.email
    }
  })

return await prisma.doctorSchedules.delete({
  where:{
    doctorId_scheduleId:{
      doctorId:existingDoctor.id,
      scheduleId:scheduleId
    }
  }
})
  
}

export const doctorScheduleServices = {
  createDoctorSchedules,
  getAllDoctorSchedules,
  myDoctorAllSchedules,
  deleteDoctorSchedules,
};
