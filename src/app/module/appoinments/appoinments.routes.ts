import express, { NextFunction, Request, Response } from "express";

import { UserRole } from "@prisma/client";
import { fileUploader } from "../../helpers/fileUploadByMulter";
import { SpecialtiesValidtaion } from "./appoinments.schema";
import { authValidation } from "../../middlewares/authValidation";
import { appointmentController } from "./appoinments.controller";

const router = express.Router();

router.get("/", appointmentController.getAllAppointment);

router.post("/", authValidation(UserRole.PATIENT), appointmentController.createAppointment);

router.patch(
  "status/:id",
  authValidation(UserRole.ADMIN, UserRole.DOCTOR),
  appointmentController.deleteAppointment
);

router.delete(
  "/:id",
  authValidation(UserRole.ADMIN, UserRole.ADMIN),
  appointmentController.deleteAppointment
);

export const appointmentRoutes = router;
