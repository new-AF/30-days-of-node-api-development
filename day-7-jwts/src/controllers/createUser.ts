import { Request, Response } from "express";
import { z } from "zod";
import { users } from "@/data/users.store";
import { userModelSchema, type UserModel } from "@/validators/users/user.model";
import { createUserSchema } from "@/validators/users/user.requests";

// POST /users
export const createUser = (request: Request, response: Response) => {
    // Request body already parsed as JSON
    const requestBody = request.body;

    const bodyResult = createUserSchema.safeParse(requestBody);
    const { success, data, error } = bodyResult;

    if (success === false) {
        // Bad request, often malformed user input
        // Zod Error, handled by `errorHandler` middleware
        throw error;
    }

    const { name, email, password } = data;
    const newUser: UserModel = { id: users.length + 1, name, email, password };

    // Validate final model shape as a guard-rail
    const modelCheck = userModelSchema.safeParse(newUser);
    if (modelCheck.success === false) {
        throw modelCheck.error;
    }

    users.push(newUser);

    // Resource created
    response.status(201);
    response.json(newUser);
};
