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
        response.status(400);
        response.json({
            error: z.flattenError(error),
        });
        return;
    }

    const { name, email } = data;
    const newUser: UserModel = { id: users.length + 1, name, email };

    // Validate final model shape as a guard-rail
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
