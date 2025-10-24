import { Router } from "express";
import { doctorScheduleController } from "./doctorSchedule.controller";
import { authValidation } from "../../middlewares/authValidation";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { DoctorSchedulesSchema } from "./doctorSchedule.schema";

const router = Router()

router.post("/", validateRequest(DoctorSchedulesSchema.createDoctorSchedulesSchema), authValidation(UserRole.DOCTOR), doctorScheduleController.createDoctorSchedules)


export const doctorScheduleRoute = router