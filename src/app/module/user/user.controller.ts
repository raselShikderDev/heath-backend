import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userServices } from "./user.services";
import sendResponse from "../../shared/sendResponse";

// Creat paitent
const createPatient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createPatient(req);
    console.log("result before sendResponse:", result);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Paitent successfully created",
      data: result,
    });
  }
);

export const usercontroller = {
  createPatient,
};
