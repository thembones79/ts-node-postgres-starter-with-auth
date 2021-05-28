import express from "express";

import {
  signupRouter,
  loginRouter,
  logoutRouter,
  helloRouter,
  currentUserRouter,
  allUsersRouter,
  showUserRouter,
} from "./auth";

const app = express();

app.use(currentUserRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(signupRouter);
app.use(helloRouter);
app.use(allUsersRouter);
app.use(showUserRouter);

export { app as userRouter };
