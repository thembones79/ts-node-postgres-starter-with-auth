import { IKeys } from "./keys";

if (!process.env.DB_CONNECTION_STRING) {
  throw new Error("DB_CONNECTION_STRING must be defined");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined");
}

export const keys: IKeys = {
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  JWT_SECRET: process.env.JWT_SECRET,
};
