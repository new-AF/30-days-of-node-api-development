import { z } from "zod";
import { userModelSchema } from "./user.model";

// GET
export const getUserSchema = userModelSchema.omit({ id: true, password: true });
export type GetUserBody = z.infer<typeof getUserSchema>;

// POST
export const createUserSchema = userModelSchema.omit({ id: true });
export type CreateUserBody = z.infer<typeof createUserSchema>;

// PUT
export const putUserSchema = userModelSchema.omit({ id: true });

// PATCH, requires at least one in payload
export const patchUserSchema = putUserSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        "At least one field must be provided"
    );
