import { Router } from "express";
import { authcontroller } from "./auth.controller";
import { UserRole } from "@prisma/client";
import { authValidation } from "../../middlewares/authValidation";

const router = Router()

router.get(
    "/me",
    authcontroller.getMe
)

router.post("/login", authcontroller.login)


router.post(
    '/refresh-token',
    authcontroller.refreshToken
)

router.post(
    '/change-password',
    authValidation(
        UserRole.ADMIN,
        UserRole.DOCTOR,
        UserRole.PATIENT
    ),
    authcontroller.changePassword
);

router.post(
    '/forgot-password',
    authcontroller.forgotPassword
);

router.post(
    '/reset-password',
    authcontroller.resetPassword
)


export const authRoute = router