import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { schedculeServices } from "./schedules.services";
import { userFilteroptions } from "../user/user.constants";
import pick from "../../helpers/pick";

// 
const inserIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await schedculeServices.inserIntoDB(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Schedule successfully created",
      data: result,
    });
  }
);

// get all schedule for doctor
const getSchedulesForDoctor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query ?? {}, ["startDateTime", "endDateTime"])
    const options = pick(req.query ?? {}, userFilteroptions)
    const result = await schedculeServices.getSchedulesForDoctor(filters, options);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedules successfully retrived",
      data: result.data,
      meta: result.meta
    });
  }
);

// delete schedule from db
const deleteScheduleFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.id)
    const result = await schedculeServices.deleteScheduleFromDB(req.params.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedule successfully deleted",
      data: result,
    });
  }
);

export const schedculeController = {
  inserIntoDB,
  getSchedulesForDoctor,
  deleteScheduleFromDB,
};
