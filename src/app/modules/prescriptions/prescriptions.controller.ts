import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IJWTPayload } from "../../types/common";
import { prescriptionsService } from "./prescriptions.service";
import httpStatus from "http-status"



const createPrescription = catchAsync(async (req: Request &{user?:IJWTPayload}, res: Response) => {

   
    const result = await prescriptionsService.createPrescription(req.user as IJWTPayload, req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Webhook req send successfully',
        data: result,
    });
});

export const prescriptionsController = {
    createPrescription
}