import dotenv from "dotenv";
import { resolve } from "path";

// Load the .env file relative to this folder (`tests`)
dotenv.config({ path: resolve(__dirname, "../.env") });
