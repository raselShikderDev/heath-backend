import express from "express";
import { userRouter } from "../module/user/user.route";
import { authRoute } from "../module/auth/auth.route";
import { schedculeRoute } from "../module/schedules/schedules.route";
import { doctorScheduleRoute } from "../module/doctorSchedule/doctorSchedule.route";
import { SpecialtiesRoutes } from "../module/specialties/specialties.routes";
import { doctorRoute } from "../module/doctor/doctor.route";
import { patientRoute } from "../module/patient/patient.route";
import { adminRoute } from "../module/admin/admin.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/schedules",
    route: schedculeRoute,
  },
  {
    path: "/doctor-schedules",
    route: doctorScheduleRoute,
  },
  {
    path: "/specialties",
    route: SpecialtiesRoutes
  },
  {
    path: "/doctors",
    route: doctorRoute,
  },
  {
    path: "/patients",
    route: patientRoute,
  },
  {
    path: "/admins",
    route: adminRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
