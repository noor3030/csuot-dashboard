import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export const BASE_URL = process.env.VUE_APP_BASE_URL as string;
