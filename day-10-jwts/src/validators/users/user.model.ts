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

    password: z
        .string("Password is required")
        .min(1, "Password of length at least 1 is required"),
});

export type UserModel = z.infer<typeof userModelSchema>;
