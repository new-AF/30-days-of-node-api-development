import { Request, Response } from "express";

// GET /test
export const getTestMessage = (_request: Request, response: Response) => {
    response.status(200);
    response.json({
        message: "All OK!",
        time: new Date().toISOString(),
    });
};
