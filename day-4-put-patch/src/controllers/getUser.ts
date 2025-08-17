import { Request, Response } from "express";
import { z } from "zod";
import { users } from "@/data/users.store";
import { userIdParamsSchema } from "@/validators/users/user.params";

const searchUsers = (userId: Number) => {
    // Search users 'database', returns first matching object, or `undefined` if none are found
    const result = users.find((user) => userId === user.id);

    if (result === undefined) return { success: false };

    return { success: true, user: result };
};

// GET /users/:id
export const getUser = (request: Request, response: Response) => {
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
