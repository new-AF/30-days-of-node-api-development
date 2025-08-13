import { Request, Response } from "express";

const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
];

// GET /users
export const getAllUsers = (_request: Request, response: Response) => {
    response.status(200);
    response.json(users);
};

const searchUsers = (userId: Number) => {
    // Search users 'database', returns first matching object, or `undefined` if none are found
    const result = users.find((user) => userId === user.id);

    if (result === undefined) return { success: false };

    return { success: true, user: result };
};

// GET /users/:id
export const getUserById = (request: Request, response: Response) => {
    const userIdParam = request.params.id;
    const userId = Number(userIdParam);

    const { success, user } = searchUsers(userId);
    if (!success) {
        response.status(404);
        response.json({
            error: `User with id ${userId} not found`,
        });
        return;
    }

    response.status(200);
    response.json(user);
};
