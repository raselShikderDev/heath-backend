import { Request, Response } from "express";
import httpStatus from "http-status";
import { appointmentService } from "./appoinments.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IJWTPayload } from "../../types/common";
import pick from "../../helpers/pick";

const createAppointment = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
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

const getMyAppointment = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const filters = pick(req.query ?? {}, ["status", "paymentStatus"])
    const options = pick(req.query ?? {}, ["status", "role", "email", "searchTerm"])
    const result = await appointmentService.getMyAppointment(req.user as IJWTPayload, options, filters);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Appoinment data fetched successfully',
        data: result.data,
        meta: result.meta,
    });
});

const updateAppointmentStatus = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

    const result = await appointmentService.getMyAppointment(req.user as IJWTPayload, req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Appoinment successfully updated',
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
    getMyAppointment,
    updateAppointmentStatus,
};