import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userServices } from "./user.services";
import sendResponse from "../../shared/sendResponse";

// Create paitent
const createPatient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createPatient(req);
    console.log("result before sendResponse for patient:", result);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Paitent successfully created",
      data: result,
    });
  }
);

// Create Doctor
const createDoctor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createDoctor(req);
    console.log("result before sendResponse of doctor:", result);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Doctor successfully created",
      data: result,
    });
  }
);

// Create Admin
const createAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createAdmin(req);
    console.log("result before sendResponse of admin:", result);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Admin successfully created",
      data: result,
    });
  }
);

export const usercontroller = {
  createPatient,
  createDoctor,
  createAdmin,
};
