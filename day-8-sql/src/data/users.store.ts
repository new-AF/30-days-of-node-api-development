import { type UserModel } from "@/validators/user.schema";

// Simulates a database table of users
export const users: UserModel[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
];
