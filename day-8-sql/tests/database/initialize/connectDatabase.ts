import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// absolute paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// absolute path
const dbPath = path.join(__dirname, "my-database.db");

export const connectDatabase = () => {
    return new Database(dbPath);
};
