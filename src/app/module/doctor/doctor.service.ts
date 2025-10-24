
import { Doctor, Prisma } from "@prisma/client";
import { IOptions, pagginationHelper } from "../../helpers/pagginationHelper";
import { prisma } from "../../shared/pirsmaConfig";
import { doctorSearchAbleFeild } from "./doctor.constrains";
import { IDoctorUpdateInput } from "./doctor.interface";


const getAllFromDB = async (filters: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } = pagginationHelper.calculatePaggination(options);
  const { searchItem, ...filterData } = filters

  const andConditations: Prisma.DoctorWhereInput[] = []
  if (searchItem) {
    andConditations.push({OR: doctorSearchAbleFeild.map((feild) => ({
      [feild]: {
        contains: searchItem,
        mode: "insensitive"
      }
    }))})
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditations = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key]
      }
    }))
    andConditations.push(...filterConditations)
  }

  const whereConditions: Prisma.DoctorWhereInput = andConditations.length > 0 ? { AND: andConditations } : {}
  const result = await prisma.doctor.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.doctor.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result
  };

};


// Doctor update
const updateDoctor = async (id:string, payload:Partial<IDoctorUpdateInput>)=>{
  const existingDoctor = await prisma.doctor.findUniqueOrThrow({
    where:{
      id,
    }
  })
  const updateDoctor = await prisma.doctor.update({
    where:{
      id:existingDoctor.id
    },
    data:payload
  })
return
}

export const doctorServices = {
  getAllFromDB,
  updateDoctor
};
