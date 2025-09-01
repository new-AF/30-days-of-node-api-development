import { type Database } from "better-sqlite3";

export const dropUsersTable = (database: Database) => {
    const sql = `DROP TABLE IF EXISTS users;`;
    database.prepare(sql).run();
};
