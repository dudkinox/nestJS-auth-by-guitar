import * as dotenv from "dotenv";

dotenv.config();

export const AuthServiceConstant = {
  PORT: process.env.PORT,
  USERNAME_DB: process.env.USERNAME_DB,
  PASSWORD_DB: process.env.PASSWORD_DB,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  PUBLIC_KEY: process.env.PUBLIC_KEY,
  AUTH_SERVICE: "auth-service",
  ACCOUNT_SERVICE: "accounts-service",
};

export const StatusCodeModel = {
  SUCCESS: { code: "0000", message: "Success" },
  FAILED: { code: "0001", message: "Failed" },
  NOT_FOUND: { code: "0002", message: "Not Found" },
  DUPLICATE: { code: "0003", message: "Duplicate" },
  INVALID: { code: "0004", message: "Invalid" },
};
