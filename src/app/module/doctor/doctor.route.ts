import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { authValidation } from "../../middlewares/authValidation";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
  "/:id",
  doctorController.updateDoctor
);
router.get("/", authValidation(UserRole.ADMIN), doctorController.getAllFromDB);
router.patch(
  "/:id",
  authValidation(UserRole.ADMIN),
  doctorController.updateDoctor
);
router.delete(
  "/:id",
  authValidation(UserRole.ADMIN),
  doctorController.updateDoctor
);

export const doctorRoute = router;
