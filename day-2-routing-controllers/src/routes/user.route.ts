import { Router } from "express";
import { getAllUsers, getUserById } from "@/controllers/user.controller";

export const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
