import { NextFunction, Response } from "express";
import { ZodError, flattenError } from "zod";

export const errorHandler = (
    error: unknown,
    _request: Request,
    response: Response,
    _next: NextFunction
) => {
    console.log(`errorHandler ${error}`);
    // Validation error
    if (error instanceof ZodError) {
        // Bad request
        response.status(400);
        response.json({ errors: flattenError(error) });
        return;
    }

    // Standard JS Exception
    if (error instanceof Error) {
        // Internal Server Error
        response.status(500);
        response.json({ error: error.message });
        return;
    }

    /*
        Safety net because JavaScript lets us throw literally anything, we must guard against it.
        e.g. `throw "DB Crashed", throw 1234`
        Without this fallback, Express would crash or hang if something bizarre was thrown.
    */
    response.status(500);
    response.json({
        error: "Unknown server error",
        detail: typeof error === "string" ? error : undefined,
    });
};
