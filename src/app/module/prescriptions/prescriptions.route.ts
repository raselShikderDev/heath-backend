import { Router } from "express";

import { authValidation } from "../../middlewares/authValidation";
import { UserRole } from "@prisma/client";
import { prescriptionsController } from "./prescriptions.controller";

const router = Router();


router.post(
  "/", prescriptionsController.createPrescription
);

export const paymentRoute = router;
