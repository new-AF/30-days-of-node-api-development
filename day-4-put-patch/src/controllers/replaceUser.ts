import { Request, Response } from "express";
import { z } from "zod";
import { users } from "@/data/users.store";
import { userIdParamsSchema } from "@/validators/users/user.params";
import { userModelSchema, type UserModel } from "@/validators/users/user.model";
import { putUserSchema } from "@/validators/users/user.requests";

export const replaceUser = (request: Request, response: Response) => {
    const { params, body } = request;

    // Validate id param
    const {
        success: userIdParamSuccess,
        data: userIdParamData,
        error: userIdParamError,
    } = userIdParamsSchema.safeParse(params);

    if (userIdParamSuccess === false) {
        // Bad request
        response.status(400);
        response.json({
            error: z.flattenError(userIdParamError),
        });
        return;
    }

    // Search for user Index
    const { id: userId } = userIdParamData;
    const index = users.findIndex((user) => user.id === userId);

    if (index === -1) {
        response.status(404);
        response.json({
            error: `User with id ${userId} not found`,
        });
        return;
    }

    // Validate payload
    const {
        success: bodySuccess,
        error: bodyError,
        data: putPayload,
    } = putUserSchema.safeParse(body);

    if (bodySuccess === false) {
        response.status(400);
        response.json({
            error: z.flattenError(bodyError),
        });
        return;
    }

    // Create new user
    const updatedUser: UserModel = { id: userId, ...putPayload };

    // Extra safeguard
    const { success: updatedUserSuccess, error: updatedUserError } =
        userModelSchema.safeParse(updatedUser);

    if (updatedUserSuccess === false) {
        response.status(500);
        response.json({ error: "Internal model validation failed." });
        return;
    }

    // Update existing user
    users[index] = updatedUser;
    response.status(200);
    response.json(updatedUser);
};
