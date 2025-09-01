import { Request, Response } from "express";
import { users as originalUsers } from "@/data/users.store";
import { getUsersWithoutProperties } from "@/data/utils/getUsersWithoutProperties";

// GET /users
export const listUsers = (_request: Request, response: Response) => {
    const users = getUsersWithoutProperties("password");

    response.status(200);
    response.json(users);
};
