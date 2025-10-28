import { Router } from "express";
import { authValidation } from "../../middlewares/authValidation";
import { UserRole } from "@prisma/client";
import { patientController } from "./patient.controller";

const router = Router();

router.get(
  "/",
  authValidation(UserRole.ADMIN),
  patientController.getAllFromDB
);

router.get(
  "/:id",
  patientController.getPatient
);
router.patch(
  "/:id",
  authValidation(UserRole.ADMIN),
  patientController.updatePatient
);
router.delete(
  "/:id",
  authValidation(UserRole.ADMIN),
  patientController.deletePatient);

export const patientRoute = router;
