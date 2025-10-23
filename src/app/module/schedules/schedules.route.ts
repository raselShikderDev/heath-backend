import { Router } from "express";
import { schedculeController } from "./schedules.controller";
import { createScheduleSchema } from "./schedules.validation";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "../../middlewares/authValidation";
import { UserRole } from "@prisma/client";

const router = Router()

router.get("/", authValidation(UserRole.ADMIN, UserRole.DOCTOR), schedculeController.getSchedulesForDoctor)
router.post("/", validateRequest(createScheduleSchema), schedculeController.inserIntoDB)
router.delete("/:id", schedculeController.deleteScheduleFromDB)


export const schedculeRoute = router