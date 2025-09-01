import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get current project folder name (e.g. "day-x-...")
const currentFolder = path.basename(path.resolve(__dirname, "../../"));

const absolutePath = path.resolve(process.cwd(), currentFolder + "/.env");

// Load the .env from the current day's folder
dotenv.config({
    path: absolutePath,
});

// console.log({ absolutePath, currentFolder });

// Fallback to port 3000 if not defined
export const PORT: number = parseInt(process.env.PORT || "3000", 10);
export const API_KEY: string = process.env.API_KEY ?? "dev-key";
