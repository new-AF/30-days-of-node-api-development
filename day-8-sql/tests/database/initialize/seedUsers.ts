import { type Database } from "better-sqlite3";
import { users as allUsers } from "@/data/users.store";

export const seedUsers = (database: Database) => {
    const statement = database.prepare(
        `INSERT INTO users (name, email) VALUES (?, ?)`
    );
    for (const { name, email } of allUsers) {
        statement.run(name, email);
    }
};
