import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helpers/pick";
import { userFilteroptions } from "../user/user.constants";
import { adminServices } from "./admin.service";
import { adminFilterAbleField } from "./admin.constrains";

// get Admins
const getAllFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query ?? {}, adminFilterAbleField);
    const options = pick(req.query ?? {}, userFilteroptions);
    const result = await adminServices.getAllFromDB(filters, options);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin successfully retrived",
      data: result,
    });
  }
);

// update Admin
const updateAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminServices.updateAdmin(req.params.id, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin successfully updated",
      data: result,
    });
  }
);

// get a Admin
const getAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminServices.getAdmin(req.params.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin successfully retrived",
      data: result,
    });
  }
);

// get a Admin
const deleteAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminServices.getAdmin(req.params.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin successfully deleted",
      data: result,
    });
  }
);

export const adminController = {
  getAllFromDB,
  updateAdmin,
  getAdmin,
  deleteAdmin,
};
