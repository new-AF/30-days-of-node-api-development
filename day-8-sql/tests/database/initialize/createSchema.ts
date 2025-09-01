import { type Database } from "better-sqlite3";

export const createSchema = (database: Database) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        );
    `;
    database.exec(sql);
};
