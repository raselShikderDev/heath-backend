import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userServices } from "./user.services";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helpers/pick";
import { userFilterAbleFeild, userFilteroptions } from "./user.constants";
import { IJWTPayload } from "../../types/common";
import httpStatus from "http-status"


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
    console.log(result);

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

    const filters = pick(req.query ?? {}, userFilterAbleFeild)
    const options = pick(req.query ?? {}, userFilteroptions)

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


// get all from Db
const getMyProfile = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response, next: NextFunction) => {

    const result = await userServices.getMyProfile(req.user as IJWTPayload);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "My profile successfully retrived",
      data: result,
    });
  }
);

const updateUserStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const result = await userServices.updateUserStatus(req.params.id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User status successfully updated",
      data: result,
    });
  }
);

const updateMyProfie = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

  const user = req.user;

  const result = await userServices.updateMyProfie(user as IJWTPayload, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My profile updated!",
    data: result
  })
});

export const usercontroller = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllFromDB,
  getMyProfile,
  updateUserStatus,
  updateMyProfie,
};
