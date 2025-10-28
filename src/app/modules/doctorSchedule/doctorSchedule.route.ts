import { Router } from "express";
import { doctorScheduleController } from "./doctorSchedule.controller";
import { authValidation } from "../../middlewares/authValidation";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { DoctorSchedulesSchema } from "./doctorSchedule.schema";

const router = Router()



router.get("/all-doctor", authValidation(UserRole.ADMIN), doctorScheduleController.getAllDoctorSchedules)
router.get("/my-schedule", authValidation(UserRole.DOCTOR), doctorScheduleController.myDoctorAllSchedules)

router.delete("/:id", authValidation(UserRole.DOCTOR), doctorScheduleController.deleteDoctorSchedules)

router.post("/", validateRequest(DoctorSchedulesSchema.createDoctorSchedulesSchema), authValidation(UserRole.DOCTOR), doctorScheduleController.createDoctorSchedules)


export const doctorScheduleRoute = router