import { Patient, Prisma } from "@prisma/client";
import { IOptions, pagginationHelper } from "../../helpers/pagginationHelper";
import { prisma } from "../../shared/pirsmaConfig";
import { patientSearchAbleFeild } from "./patient.constrains";

const getAllFromDB = async (filters: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    pagginationHelper.calculatePaggination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.PatientWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: patientSearchAbleFeild.map((feild) => ({
        [feild]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));
    andConditions.push(...filterConditions);
  }

  const whereConditions: Prisma.PatientWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.patient.findMany({
    skip,
    take: limit,
    where: whereConditions,
    include: {
      user: {
        include: {
          doctor: true,
        },
      },
    },
  });
  const total = await prisma.patient.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Patient update
const updatePatient = async (id: string, payload: any) => {
  const existingPatient = await prisma.patient.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const { specialties, ...PatientData } = payload;
  return await prisma.$transaction(async (trans) => {
    const updatePatient = await trans.patient.update({
      where: {
        id: existingPatient.id,
      },
      data: PatientData,
    });
    return updatePatient;
  });
};

// Get a Patient
const getPatient = async (id: string) => {
  return await prisma.patient.findUniqueOrThrow({
    where: {
      id,
    },
  });
};

// Get a Patient
const deletePatient = async (id: string) => {
  return await prisma.patient.delete({
    where: {
      id,
    },
  });
};

export const patientServices = {
  getAllFromDB,
  updatePatient,
  getPatient,
  deletePatient,
};
