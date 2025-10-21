import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { authServices } from "./auth.service";

// Creat paitent
const login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const result = await authServices.login(req.body.email, req.body.password);
        const { accessToken, refreshToken, needPasswordChange } = result
        console.log("result before sendResponse:", result);
        // Setting accessToken in cookies
        res.cookie("accessToken", accessToken, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60
        })
        // Setting refreshToken in cookies
        res.cookie("refreshToken", refreshToken, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 30
        })
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User successfully logged in",
            data: {
              needPasswordChange
            },
        });
    }
);

export const authcontroller = {
    login,
};
