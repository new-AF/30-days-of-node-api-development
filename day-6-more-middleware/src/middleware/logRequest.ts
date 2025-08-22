import { Request, Response, NextFunction } from "express";

const getTimeWithDateUTC = (): string => {
    const time = new Date().toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
        hour12: false,
        // Force UTC for global consistency
        timeZone: "UTC",
    });

    return `${time} UTC`;
};

export const logRequest = (
    request: Request,
    _response: Response,
    next: NextFunction
) => {
    const time = getTimeWithDateUTC();
    const { method, originalUrl } = request;
    console.log(`[${time}] ${method} ${originalUrl}`);

    // Authorization middleware: check API key
    next();
};
