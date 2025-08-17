import { Router } from "express";
import { listUsers } from "@/controllers/listUsers";
import { getUser } from "@/controllers/getUser";
import { createUser } from "@/controllers/createUser";

export const userRouter = Router();

userRouter.get("/", listUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
