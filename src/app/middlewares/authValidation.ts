import { NextFunction, Request, Response } from "express"
import envVars from "../../config/envVars";
import { jwtHelper } from "../helpers/jwtHelper";

export const authValidation = (...roles: string[]) => {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.accessToken || ""
            if (!token) {
                throw new Error("You are not authorized");
            }
            const verifiedToken = jwtHelper.verifyToken(token, envVars.jwt.access_secret as string)
            if (!verifiedToken) {
                throw new Error("You are not authorized");
            }
            if (roles.length && !roles.includes(verifiedToken.role)) {
                throw new Error("you are not authorized");
            }
            req.user = verifiedToken
            next()
        } catch (error) {
            next(error)
        }
    }
}