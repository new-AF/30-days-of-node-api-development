import { users as originalUsers } from "@/data/users.store";

export const searchUsers = (userId: Number) => {
    // Search users 'database', returns first matching object, or `undefined` if none are found
    const result = originalUsers.find((user) => userId === user.id);

    if (result === undefined) return { success: false };

    return { success: true, user: result };
};
