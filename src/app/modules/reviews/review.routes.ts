import express, { NextFunction, Request, Response } from "express";

import { UserRole } from "@prisma/client";
import { authValidation } from "../../middlewares/authValidation";
import { reviewController } from "./review.controller";

const router = express.Router();

router.get("/",  reviewController.getAllReview);

router.post("/", reviewController.createReview);



router.delete(
  "/:id", reviewController.deleteReview
);

export const reviewRoutes = router;
