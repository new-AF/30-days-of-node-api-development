import { describe, expect, it, beforeEach } from "vitest";
// database operations
import { connectDatabase } from "./initialize/connectDatabase";
import { createSchema } from "./initialize/createSchema";
import { seedUsers } from "./initialize/seedUsers";
import { dropUsersTable } from "./initialize/dropUsersTable";
//
import { users as allUsers } from "@/data/users.store";

const database = connectDatabase();

// runs before each test case
beforeEach(() => {
    dropUsersTable(database);
    createSchema(database);
    seedUsers(database);
});

const cases = {};

cases["SELECT * FROM users"] = async () => {
    // array of objects
    const users = database.prepare("SELECT * FROM users").all();

    console.log("Users from SQL database", { users });

    // confirm it's non-empty array
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThanOrEqual(1);

    // insertion order is preserved in sqlite
    // assert every object matches in `allUsers`
    users.forEach((obj, index) => {
        expect(obj).toMatchObject(allUsers[index]);
    });
};

// top-level describe
describe("select", () =>
    Object.entries(cases).forEach(([caseName, testFunction]) =>
        it(caseName, testFunction)
    ));
