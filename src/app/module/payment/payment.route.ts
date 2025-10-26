import { Router } from "express";

import { authValidation } from "../../middlewares/authValidation";
import { UserRole } from "@prisma/client";

const router = Router();


router.post(
  "/",
);

export const paymentRoute = router;
