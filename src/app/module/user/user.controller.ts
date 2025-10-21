import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userServices } from "./user.services";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helpers/pick";


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


// get all from Db
const getAllFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // page, limit, sortBy, sortOrder - paggination & sorting
    // searchTerm, feilds - Searching & filtering

    const filters = pick(req.query, ["status", "role", "email", "searchTerm"])
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])

    // const {page, limit, searchTerm, sortBy, sortOrder, role, status} = req.query
    const result = await userServices.getAllFromDB(filters, options);
    console.log("result before sendResponse of get all:", result);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users successfully retrived",
      data: result,
    });
  }
);

export const usercontroller = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllFromDB
};
