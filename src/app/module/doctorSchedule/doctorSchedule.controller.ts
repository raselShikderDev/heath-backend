import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { doctorScheduleServices } from "./doctorSchedule.service";
import { IJWTPayload } from "../../types/common";

// Creat doctor schedules
const createDoctorSchedules = catchAsync(
  async (req: Request &{user?:IJWTPayload}, res: Response, next: NextFunction) => {
    const result = await doctorScheduleServices.createDoctorSchedules(req.user as IJWTPayload, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Doctor schedules successfully created",
      data: result
    });
  }
);
// Creat doctor schedules
const getDoctorSchedule = catchAsync(
  async (req: Request &{user?:IJWTPayload}, res: Response, next: NextFunction) => {
    const result = await doctorScheduleServices.createDoctorSchedules(req.user as IJWTPayload, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Doctor schedules successfully created",
      data: result
    });
  }
);

export const doctorScheduleController = {
  createDoctorSchedules,
};
