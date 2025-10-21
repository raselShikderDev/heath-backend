import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { authServices } from "./auth.service";

// Creat paitent
const createPatient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const result = await authServices.login(req.body.email, req.body.password);
    console.log("result before sendResponse:", result);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User successfully logged in",
      data: result,
    });
  }
);

export const usercontroller = {
  createPatient,
};
