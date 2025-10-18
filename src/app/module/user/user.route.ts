import { NextFunction, Request, Response, Router } from "express";
import { usercontroller } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { fileUploader } from "../../helpers/fileUploadByMulter";

const router = Router();

router.post(
  "/create-paitent",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createPatientValidationSchema.parse(JSON.parse(req.body.data));
    return usercontroller.createPaitent(req, res, next);
  }
);

export const userRouter = router;
