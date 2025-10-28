import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import { paymentController } from "./app/modules/payment/payment.controller";

const app: Application = express();

app.post(
  "/payment/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleStripeWebhookEvent
);

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

//parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("health Care is running..");
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
