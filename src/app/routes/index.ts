import express from "express";
import { userRouter } from "../module/user/user.route";
import { authRoute } from "../module/auth/auth.route";
import { schedculeRoute } from "../module/schedules/schedules.route";
import { doctorScheduleRoute } from "../module/doctorSchedule/doctorSchedule.route";
import { SpecialtiesRoutes } from "../module/specialties/specialties.routes";
import { doctorRoute } from "../module/doctor/auth.route";

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
    path: '/specialties',
    route: SpecialtiesRoutes
  },
  {
    path: '/doctor',
    route: doctorRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
