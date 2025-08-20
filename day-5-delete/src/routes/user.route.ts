import { Router } from "express";
import { listUsers } from "@/controllers/listUsers";
import { getUser } from "@/controllers/getUser";
import { createUser } from "@/controllers/createUser";
import { replaceUser } from "@/controllers/replaceUser";
import { updateUser } from "@/controllers/updateUser";
import { deleteUser } from "@/controllers/deleteUser";

export const userRouter = Router();

userRouter.get("/", listUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.put("/:id", replaceUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
