import { Router } from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
} from "@/controllers/user.controller";

export const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
