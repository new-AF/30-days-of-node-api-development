import { Request, Response } from "express";
import { z } from "zod";
import { users } from "@/data/users.store";
import { userModelSchema, type UserModel } from "@/validators/users/user.model";
import { userIdParamsSchema } from "@/validators/users/user.params";
import { patchUserSchema } from "@/validators/users/user.requests";

const formatErrors = (error: z.ZodError) => z.flattenError(error);

export const updateUser = (request: Request, response: Response) => {
    // Validate id param
    const paramsResult = userIdParamsSchema.safeParse(request.params);
    if (paramsResult.success === false) {
        response.status(400);
        response.json({ errors: formatErrors(paramsResult.error) });
        return;
    }

    // Search user
    const userId = paramsResult.data.id;
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
        response.status(404);
        response.json({ error: `User with id ${userId} not found` });
        return;
    }

    // Validate payload
    const bodyResult = patchUserSchema.safeParse(request.body);
    if (bodyResult.success === false) {
        response.status(400);
        response.json({ errors: formatErrors(bodyResult.error) });
        return;
    }

    const currentUser = users[userIndex];
    const updatedUser: UserModel = { ...currentUser, ...bodyResult.data };

    // Validate before inserting
    const finalCheck = userModelSchema.safeParse(updatedUser);
    if (finalCheck.success === false) {
        response.status(500);
        response.json({ errors: formatErrors(finalCheck.error) });
        return;
    }

    users[userIndex] = finalCheck.data;
    response.status(200);
    response.json(users[userIndex]);
};
