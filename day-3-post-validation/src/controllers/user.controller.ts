import { Request, Response } from "express";
// import { isValidUserInput } from "@/validators/user.validator";
import {
    createUserSchema,
    userIdParamsSchema,
    userModelSchema,
    type UserModel,
} from "@/validators/user.schema";

import { z } from "zod";

const users: UserModel[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
];

// POST /users
export const createUser = (request: Request, response: Response) => {
    // Request body already parsed as JSON
    const requestBody = request.body;

    // const { success, error } = isValidUserInput(requestBody);
    const bodyResult = createUserSchema.safeParse(request.body);
    const { success, data, error } = bodyResult;

    if (success === false) {
        // Bad request, often malformed user input
        response.status(400);
        response.json({
            error: z.flattenError(error),
        });
        return;
    }

    const { name, email } = data;
    const newUser: UserModel = { id: users.length + 1, name, email };

    // Optional: validate final model shape as a guard-rail
    const modelCheck = userModelSchema.safeParse(newUser);
    if (modelCheck.success === false) {
        response.status(500);
        response.json({ error: "Internal model validation failed." });
        return;
    }

    users.push(newUser);

    // Resource created
    response.status(201);
    response.json(newUser);
};

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
    const {
        success: paramParseSuccess,
        data,
        error,
    } = userIdParamsSchema.safeParse(request.params);

    if (paramParseSuccess === false) {
        response.status(400);
        response.json({ error: z.flattenError(error) });
        return;
    }

    const { id: userId } = data;

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
