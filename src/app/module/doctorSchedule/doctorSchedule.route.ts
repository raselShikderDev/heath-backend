import { Router } from "express";
import { doctorScheduleController } from "./doctorSchedule.controller";
import { authValidation } from "../../middlewares/authValidation";
import { UserRole } from "@prisma/client";

const router = Router()

router.post("/", authValidation(UserRole.DOCTOR), doctorScheduleController.insertIntoDB)


export const doctorScheduleRoute = router