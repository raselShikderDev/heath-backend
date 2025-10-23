import { Request } from "express";
import envVars from "../../../config/envVars";
import { prisma } from "../../shared/pirsmaConfig";
import * as bcrypt from "bcrypt";
import { fileUploader } from "../../helpers/fileUploadByMulter";
import { pagginationHelper } from "../../helpers/pagginationHelper";
import { Prisma, UserRole } from "@prisma/client";
import { userSearchAbleFeilds } from "./user.constants";

// Create Patient
const createPatient = async (req: Request) => {
  // If file exists then upload to cloudinary
  if (!req.file) {
    console.log("file not exists");
  }
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    console.log({
      uploadResult: uploadResult?.secure_url as string,
    });
    req.body.patient.profilePhoto = uploadResult?.secure_url;
  }
  console.log(req.body);
  console.log({
    pass: req.body.password,
    salt: Number(envVars.bcrypt_salt as string),
  });
  // return req.body;

  const hasedPassword = await bcrypt.hash(
    req.body.password,
    5
    // Number(envVars.bcrypt_salt as string)
  );
  console.log("hasedPassword", hasedPassword);

  // Creating user and patient
  const result = await prisma.$transaction(async (trans: any) => {
    await trans.user.create({
      data: {
        email: req.body.patient?.email,
        password: hasedPassword,
      },
    });
    return await trans.patient.create({
      data: req.body.patient,
    });
  });
  console.log("result in service", result);

  return result;
};

// Create Doctor
const createDoctor = async (req: Request) => {
  // If file exists then upload to cloudinary
  if (!req.file) {
    console.log("file not exists");
  }
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    console.log({
      uploadResult: uploadResult?.secure_url as string,
    });
    req.body.doctor.profilePhoto = uploadResult?.secure_url;
  }
  console.log(req.body);
  console.log({
    pass: req.body.password,
    salt: Number(envVars.bcrypt_salt as string),
  });
  // return req.body;

  const hasedPassword = await bcrypt.hash(
    req.body.password,
    10
    // Number(envVars.bcrypt_salt as string)
  );
  console.log("hasedPassword", hasedPassword);

  // Creating user and doctor
  const result = await prisma.$transaction(async (trans: any) => {
    await trans.user.create({
      data: {
        email: req.body.doctor?.email,
        password: hasedPassword,
        role: UserRole.DOCTOR,
      },
    });
    return await trans.doctor.create({
      data: req.body.doctor,
    });
  });
  console.log("result in service of doctor", result);

//   {
//   "password": "StrongPassword123!",
//   "doctor": {
//     "name": "Dr. John Doe",
//     "email": "johndoe@example.com",
//     "contactNumber": "1234567890",
//     "address": "123 Medical Street, City, Country",
//     "registrationNumber": "REG-456789",
//     "experience": 10,
//     "gender": "MALE",
//     "appointmentFee": 50,
//     "qualification": "MBBS, MD",
//     "currentWorkingPlace": "City Hospital",
//     "designation": "Senior Consultant"
//   }
// }

  return result;
};

// Create admin
const createAdmin = async (req: Request) => {
  // If file exists then upload to cloudinary
  if (!req.file) {
    console.log("file not exists");
  }
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    console.log({
      uploadResult: uploadResult?.secure_url as string,
    });
    req.body.admin.profilePhoto = uploadResult?.secure_url;
  }
  console.log(req.body);
  console.log({
    pass: req.body.password,
    salt: Number(envVars.bcrypt_salt as string),
  });
  // return req.body;

  const hasedPassword = await bcrypt.hash(
    req.body.password,
    10
    // Number(envVars.bcrypt_salt as string)
  );
  // console.log("hasedPassword", hasedPassword);

  // Creating user and admin
  const result = await prisma.$transaction(async (trans: any) => {
    await trans.user.create({
      data: {
        email: req.body.admin?.email,
        password: hasedPassword,
        role: UserRole.ADMIN,
      },
    });
    console.log("admin", req.body.admin);

    return await trans.admin.create({
      data: req.body.admin,
    });
  });
  console.log("result in service of admin", result);

  return result;
};

// get all users from Db
const getAllFromDB = async (params: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } =
    pagginationHelper.calculatePaggination(options);
  const { searchItem, ...filters } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  const whereConditons: Prisma.UserWhereInput =
    andConditions.length > 0
      ? {
        AND: andConditions,
      }
      : {};

  if (searchItem) {
    andConditions.push({
      OR: userSearchAbleFeilds.map((feild) => ({
        [feild]: {
          contains: searchItem,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filters).length > 0) {
    andConditions.push({
      AND: Object.keys(filters).map((key) => ({
        [key]: {
          equals: (filters as any)[key],
        },
      })),
    });
  }

  const result = await prisma.user.findMany({
    skip,
    take: limit,
    where: whereConditons,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.user.count({
    where: whereConditons,
  });
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

export const userServices = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllFromDB,
};
