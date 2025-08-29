import { Request, Response, NextFunction } from "express";
import { API_KEY } from "@/config/environment";

export const checkApiKey = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const providedKey = request.headers["x-api-key"];

    if (providedKey === undefined) {
        response.status(401);
        response.json({
            message: "Unauthorized request: Missing API Key",
        });
        return;
    }

    if (providedKey !== API_KEY) {
        // Unauthorized
        response.status(401);
        response.json({
            message: "Unauthorized request: Invalid API Key",
        });
        return;
    }

    // Controllers
    next();
};
