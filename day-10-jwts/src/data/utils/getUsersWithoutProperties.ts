import { users as originalUsers } from "@/data/users.store";
import { copyUserWithoutProperties } from "@/data/utils/copyUserWithoutProperties";

// copy all properties except those in 'omitProps'
export const getUsersWithoutProperties = (...omitProps: string[]) => {
    const users = originalUsers.map((oldUser) => {
        return copyUserWithoutProperties(oldUser, ...omitProps);
    });

    return users;
};
