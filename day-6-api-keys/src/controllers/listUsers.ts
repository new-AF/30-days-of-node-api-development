import { Request, Response } from "express";
import { users } from "@/data/users.store";

// GET /users
export const listUsers = (_request: Request, response: Response) => {
    response.status(200);
    response.json(users);
};
