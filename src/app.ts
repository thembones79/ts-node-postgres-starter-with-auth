import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieSession from "cookie-session";

import { router } from "./routes";
import { errorHandler, currentUser } from "./middlewares";
import { keys } from "./config/keys";
import { NotFoundError } from "./errors";

const isOnProduction = process.env.NODE_ENV === "production";

const corsOptions = {
  origin: keys.CLIENT_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

app.set("trust proxy", true);
app.use(morgan("combined"));
app.use(helmet());
app.use(cors(corsOptions));
console.log({ corsOptions });
app.use(json({ type: "*/*" }));

// force forwarding to https on Heroku
// if (isOnProduction) {
//   app.use((req, res, next) => {
//     if (req.header("x-forwarded-proto") !== "https")
//       res.redirect(`https://${req.header("host")}${req.url}`);
//     else next();
//   });
// }
app.enable("trust proxy");
app.use(
  cookieSession({
    signed: false,
    secure: isOnProduction,
    httpOnly: false,
    sameSite: isOnProduction ? "none" : false,
  })
);
app.use(currentUser);
app.use(router);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
