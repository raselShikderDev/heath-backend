import { Router } from "express";
import { schedculeController } from "./schedules.controller";

const router = Router()

router.get("/", schedculeController.getSchedulesForDoctor)
router.post("/", schedculeController.inserIntoDB)
router.delete("/:id", schedculeController.deleteScheduleFromDB)


export const schedculeRoute = router