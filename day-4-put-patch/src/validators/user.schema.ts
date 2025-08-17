import { z } from "zod";

// Regex to match alphabetic characters (upper/lowercase) and optional space between
const namePattern = new RegExp(
    [
        // Start of string
        "^",

        // First word (letters only)
        "[A-Za-z]+",

        // Start group for "space + word"
        "(",

        // Space
        "\\s",

        // At least one letter
        "[A-Za-z]+",

        // Repeat zero or more times
        ")*",

        // End of string
        "$",
    ].join(""),
    "u"
);

// Full user model schema (server-side shape)
export const userModelSchema = z.object({
    id: z.number().int().min(1, "ID must be 1 or higher"),

    name: z
        .string()
        .min(1, "Name is required")
        .regex(namePattern, "Name must contain only letters and spaces"),

    email: z.email("Invalid email address").min(1, "Email is required"),
});

export type UserModel = z.infer<typeof userModelSchema>;

// Schema for POST /users body without `id`
export const createUserSchema = userModelSchema.omit({ id: true });
export type CreateUserBody = z.infer<typeof createUserSchema>;

// Schema for validating `/users/:id` route params
export const userIdParamsSchema = z.object({
    id: z.coerce.number().int().min(1, "ID must be 1 or higher"),
});
export type UserIdParams = z.infer<typeof userIdParamsSchema>;
