import { Doctor, Prisma } from "@prisma/client";
import { IOptions, pagginationHelper } from "../../helpers/pagginationHelper";
import { prisma } from "../../shared/pirsmaConfig";
import { doctorSearchAbleFeild } from "./doctor.constrains";
import { IDoctorUpdateInput } from "./doctor.interface";

const getAllFromDB = async (filters: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    pagginationHelper.calculatePaggination(options);
  const { searchItem, specalities, ...filterData } = filters;

  const andConditations: Prisma.DoctorWhereInput[] = [];
  // Checking and push searcterm intro conditions if any
  if (searchItem) {
    andConditations.push({
      OR: doctorSearchAbleFeild.map((feild) => ({
        [feild]: {
          contains: searchItem,
          mode: "insensitive",
        },
      })),
    });
  }

  // checking and pushing specilaties if any
  if (specalities && specalities.length > 0) {
    andConditations.push({
      AND: {
        doctorSpecialties: {
          some: {
            specialities: {
              title: {
                contains: specalities,
                mode: "insensitive",
              },
            },
          },
        },
      },
    });
  }

  // Checking and pushing filter data if any
  if (Object.keys(filterData).length > 0) {
    const filterConditations = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));
    andConditations.push(...filterConditations);
  }

  const whereConditions: Prisma.DoctorWhereInput =
    andConditations.length > 0 ? { AND: andConditations } : {};
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
    data: result,
  };
};

// Doctor update
const updateDoctor = async (
  id: string,
  payload: Partial<IDoctorUpdateInput>
) => {
  const existingDoctor = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const { specialties, ...doctorData } = payload;
  return await prisma.$transaction(async (trans) => {
    if (specialties && specialties.length > 0) {
      // getting all deleted specalities
      const deletedSpecilitesIds = specialties.filter(
        (specialtiy) => specialtiy.isDeleted
      );
      // deleting specilites from the databased
      for (const specialtiy of deletedSpecilitesIds) {
        await trans.doctorSpecialties.deleteMany({
          where: {
            doctorId: id,
            specialitiesId: specialtiy.specialitiesId,
          },
        });
      }
      const createSpecilitesIds = specialties.filter(
        (specialtiy) => !specialtiy.isDeleted
      );
      // creating specilites from the databased
      for (const specialtiy of createSpecilitesIds) {
        await trans.doctorSpecialties.createMany({
          data: {
            doctorId: id,
            specialitiesId: specialtiy.specialitiesId,
          },
        });
      }
    }

    const updateDoctor = await trans.doctor.update({
      where: {
        id: existingDoctor.id,
      },
      data: doctorData,
      include: {
        doctorSpecialties: {
          include: {
            specialities: true,
          },
        },
      },
    });
    return updateDoctor;
  });
};

// Get a doctor
const getDoctor = async (id: string) => {
  return await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });
};

// Get a doctor
const deleteDoctor = async (id: string) => {
  return await prisma.doctor.delete({
    where: {
      id,
    },
  });
};

export const doctorServices = {
  getAllFromDB,
  updateDoctor,
  getDoctor,
  deleteDoctor,
};
