import { NextFunction, Request, Response, Router } from "express";
import { usercontroller } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { fileUploader } from "../../helpers/fileUploadByMulter";

const router = Router();

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body?.data) {
      req.body = userValidation.createPatientValidationSchema.parse(
        JSON.parse(req.body.data)
      );
    }
    return usercontroller.createPatient(req, res, next);
  }
);


export const userRouter = router;
