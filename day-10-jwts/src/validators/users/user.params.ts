import { z } from "zod";

// GET by id
export const userIdParamsSchema = z.object({
    id: z.coerce.number().int().min(1, "ID must be 1 or higher"),
});
export type UserIdParams = z.infer<typeof userIdParamsSchema>;
