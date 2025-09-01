import { type UserModel } from "@/validators/users/user.model";

// Simulates a database table of users
export const users: UserModel[] = [
    { id: 1, name: "Alice", email: "alice@example.com", password: "alice123" },
    { id: 2, name: "Bob", email: "bob@example.com", password: "bob123" },
];
