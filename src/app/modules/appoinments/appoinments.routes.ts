import express, { NextFunction, Request, Response } from "express";

import { UserRole } from "@prisma/client";
import { authValidation } from "../../middlewares/authValidation";
import { appointmentController } from "./appoinments.controller";

const router = express.Router();

router.get("/", authValidation(...Object.keys(UserRole)), appointmentController.getAllAppointment);

router.get("/my-appoinment", authValidation(UserRole.PATIENT, UserRole.DOCTOR), appointmentController.getMyAppointment);

router.get("/all-doctor-appoinment", authValidation(UserRole.ADMIN), appointmentController.getAllDoctorAppointment);

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
