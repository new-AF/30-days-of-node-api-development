import { NextFunction, Request, Response } from "express";
import { users } from "@/data/users.store";
import { userIdParamsSchema } from "@/validators/users/user.params";

const deleteUserCore = (request: Request, response: Response) => {
    const { params } = request;
    const paramsResult = userIdParamsSchema.safeParse(params);

    if (paramsResult.success === false) {
        // Zod Error, handled by `errorHandler` middleware
        throw paramsResult.error;
    }

    const userId = paramsResult.data.id;
    const findIndex = users.findIndex((user) => userId === user.id);

    // User not found. Not an error (Runtime or Validation), just expected outcome.
    if (findIndex === -1) {
        response.status(404);
        response.json({
            message: response.json({
                message: `User with id ${userId} not found`,
            }),
        });
        return;
    }

    // Delete users[findIndex]
    users.splice(findIndex, 1);

    // Success, no content
    response.status(204);
    response.send();
};

export const deleteUser = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        deleteUserCore(request, response);
    } catch (error) {
        // Call error handler middleware
        next(error);
    }
};
