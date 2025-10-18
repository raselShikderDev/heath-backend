import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import config from "./config/envVars";
import { uptime } from "process";
import { timeStamp } from "console";
import router from "./app/routes";
import { fileUploader } from "./app/helpers/fileUploadByMulter";
import { userValidation } from "./app/module/user/user.validation";
import { usercontroller } from "./app/module/user/user.controller";

const app: Application = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("health Care is running..");
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
