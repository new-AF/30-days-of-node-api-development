import dotenv from "dotenv";
import path from "path";

// Load the .env from the current day's folder
dotenv.config({
    path: path.resolve(process.cwd(), "day-1-setup/.env"),
});

// Fallback to port 3000 if not defined
export const PORT: number = parseInt(process.env.PORT || "3000", 10);
