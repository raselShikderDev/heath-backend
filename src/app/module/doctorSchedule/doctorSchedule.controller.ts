import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { doctorScheduleServices } from "./doctorSchedule.service";
import { IJWTPayload } from "../../types/common";

// Creat paitent
const insertIntoDB = catchAsync(
  async (req: Request &{user?:IJWTPayload}, res: Response, next: NextFunction) => {
    const result = await doctorScheduleServices.insertIntoDB(req.user as IJWTPayload, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Doctor schedules successfully created",
      data: result
    });
  }
);

export const doctorScheduleController = {
  insertIntoDB,
};
