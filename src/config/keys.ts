export interface IKeys {
  JWT_SECRET: string;
  CLIENT_ORIGIN: string;
  PGHOST: string;
  PGPORT: string;
  PGDATABASE: string;
  PGUSER: string;
  PGPASSWORD: string;
}

let keys: IKeys;

const getKeys = (): IKeys => {
  if (process.env.NODE_ENV === "production") {
    const prodKeys = require("./prod").keys;
    return prodKeys;
  } else {
    const devKeys = require("./dev").keys;
    return devKeys;
  }
};

keys = getKeys();

export { keys };
