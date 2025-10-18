import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userServices } from "./user.services";
import sendResponse from "../../shared/sendResponse";

// Creat paitent
const createPaitent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Body", req.body);
    console.log("Data", req.body.data);

    const result = await userServices.createPaitent(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Paitent successfully created",
      data: result,
    });
  }
);

export const usercontroller = {
  createPaitent,
};
