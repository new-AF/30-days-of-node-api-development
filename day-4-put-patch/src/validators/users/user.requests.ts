import { z } from "zod";
import { userModelSchema } from "./user.model";

// POST
export const createUserSchema = userModelSchema.omit({ id: true });
export type CreateUserBody = z.infer<typeof createUserSchema>;

// PUT
export const putUserSchema = userModelSchema.omit({ id: true });
