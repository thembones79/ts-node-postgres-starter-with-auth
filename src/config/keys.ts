export interface IKeys {
  DB_CONNECTION_STRING: string;
  JWT_SECRET: string;
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
