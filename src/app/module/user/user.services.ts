import { Request } from "express";
import envVars from "../../../config/envVars";
import { prisma } from "../../shared/pirsmaConfig";
import * as bcrypt from "bcrypt";
import { fileUploader } from "../../helpers/fileUploadByMulter";

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
  const result = await prisma.$transaction(async (trans) => {
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

export const userServices = {
  createPatient,
};
