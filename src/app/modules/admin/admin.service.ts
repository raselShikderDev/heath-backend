import { Admin, Prisma } from "@prisma/client";
import { IOptions, pagginationHelper } from "../../helpers/pagginationHelper";
import { prisma } from "../../shared/pirsmaConfig";
import { adminSearchAbleFeild } from "./admin.constrains";
import { IAdminUpdateInput } from "./admin.interface";

const getAllFromDB = async (filters: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    pagginationHelper.calculatePaggination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.AdminWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFeild.map((feild) => ({
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

  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.admin.findMany({
    skip,
    take: limit,
    where: whereConditions,
  });
  const total = await prisma.admin.count({
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

// Admin update
const updateAdmin = async (id: string, payload: Partial<IAdminUpdateInput>) => {
  const existingAdmin = await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const updateadmin = await prisma.admin.update({
    where: {
      id: existingAdmin.id,
    },
    data: payload,
  });
  return updateadmin;
};

// Get a Admin
const getAdmin = async (id: string) => {
  return await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
};

// Get a Admin
const deleteAdmin = async (id: string) => {
  return await prisma.admin.delete({
    where: {
      id,
    },
  });
};

export const adminServices = {
  getAllFromDB,
  updateAdmin,
  getAdmin,
  deleteAdmin,
};
