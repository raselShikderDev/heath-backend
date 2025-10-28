import { Router } from "express";

import { authValidation } from "../../middlewares/authValidation";
import { UserRole } from "@prisma/client";
import { prescriptionsController } from "./prescriptions.controller";

const router = Router();


router.get(
  "/my-prescriptions", authValidation(UserRole.PATIENT), prescriptionsController.createPrescription
);

router.post(
  "/", prescriptionsController.createPrescription
);

export const prescriptionsRoute = router;
