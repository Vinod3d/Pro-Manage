import { config } from "dotenv";
config();
export const {
    APP_PORT,
    MONGO_URI,
    JWT_KEY,
    JWT_EXPIRES,
    COOKIE_EXPIRES,
    DEBUG_MODE,
    FRONTEND_URL
} = process.env;