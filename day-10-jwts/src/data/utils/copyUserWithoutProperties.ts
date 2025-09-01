import { type UserModel } from "@/validators/users/user.model";

export const copyUserWithoutProperties = (
    oldUser: UserModel,
    ...omitProps: string[]
) => {
    const user = {};
    for (const [propertyName, value] of Object.entries(oldUser)) {
        if (omitProps.includes(propertyName)) continue;
        user[propertyName] = value;
    }
    return user;
};
