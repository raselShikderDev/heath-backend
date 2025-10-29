import { Router } from "express";
import { UserRole } from "@prisma/client";
import { authValidation } from "../../middlewares/authValidation";
import { metaController } from "./meta.controller";

const router = Router()

router.get(
    "/meta-data", metaController.fetchDashboardMetaData
)




export const metaRoute = router