import { Router } from "express";
import { schedculeController } from "./schedules.controller";

const router = Router()

router.post("/", schedculeController.inserIntoDB)


export const schedculeRoute = router