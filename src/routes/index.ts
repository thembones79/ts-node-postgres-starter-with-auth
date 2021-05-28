import express from "express";
import { userRouter } from "./userRouter";
const app = express();
app.use(userRouter);
export { app as router };
