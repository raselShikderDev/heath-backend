import { Request, Response } from "express";
import httpStatus from "http-status";
import { appointmentService } from "./appoinments.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IJWTPayload } from "../../types/common";

const createAppointment = catchAsync(async (req: Request &{user?:IJWTPayload}, res: Response) => {
    const result = await appointmentService.createAppointment(req.user as IJWTPayload, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Appoinment created successfully!",
        data: result
    });
});

const getAllAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await appointmentService.getAllAppointment();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Appoinment data fetched successfully',
        data: result,
    });
});

const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await appointmentService.deleteAppointment(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Appoinment deleted successfully',
        data: result,
    });
});

export const appointmentController = {
  createAppointment,
  getAllAppointment,
  deleteAppointment,
};