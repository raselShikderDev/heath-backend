import { Router } from "express";
import { doctorController } from "./doctor.controller";

const router = Router()

router.post("/", doctorController.getAllFromDB)
router.patch("/:id", doctorController.updateDoctor)


export const doctorRoute = router