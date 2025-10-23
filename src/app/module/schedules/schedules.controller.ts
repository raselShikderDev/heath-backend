import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { schedculeServices } from "./schedules.services";

// Creat paitent
const inserIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await schedculeServices.inserIntoDB(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedule successfully created",
      data: result,
    });
  }
);

export const schedculeController = {
  inserIntoDB,
};
