import { Router } from "express";
import { authValidation } from "../../middlewares/authValidation";
import { UserRole } from "@prisma/client";
import { adminController } from "./admin.controller";

const router = Router();

router.get("/", authValidation(UserRole.ADMIN), adminController.getAllFromDB);

router.get("/:id", authValidation(UserRole.ADMIN), adminController.getAdmin);
router.patch(
  "/:id",
  authValidation(UserRole.ADMIN),
  adminController.updateAdmin
);
router.delete(
  "/:id",
  authValidation(UserRole.ADMIN),
  adminController.deleteAdmin
);

export const doctorRoute = router;
