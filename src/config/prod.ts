import { IKeys } from "./keys";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined");
}

if (!process.env.CLIENT_ORIGIN) {
  throw new Error("CLIENT_ORIGIN must be defined");
}

if (!process.env.PGHOST) {
  throw new Error("PGHOST must be defined");
}

if (!process.env.PGPORT) {
  throw new Error("PGPORT must be defined");
}

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE must be defined");
}

if (!process.env.PGUSER) {
  throw new Error("PGUSER must be defined");
}

if (!process.env.PGPASSWORD) {
  throw new Error("PGPASSWORD must be defined");
}

export const keys: IKeys = {
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  PGHOST: process.env.PGHOST,
  PGPORT: process.env.PGPORT,
  PGDATABASE: process.env.PGDATABASE,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
};
