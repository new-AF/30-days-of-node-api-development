// Validate if a string contains only letters and optional spaces
const isValidName = (nameValue: unknown): boolean => {
    if (typeof nameValue !== "string") {
        return false;
    }

    // Regex to match alphabetic characters (upper/lowercase) and spaces
    const namePattern = new RegExp(
        [
            // Start of string
            "^",

            // First word (letters only)
            "[A-Za-z]+",

            // Start group for " space + word"
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

    return namePattern.test(nameValue);
};

// Validate if a string is a valid email address
const isValidEmail = (emailValue: unknown): boolean => {
    if (typeof emailValue !== "string") {
        return false;
    }

    const trimmedEmail = emailValue.trim();
    if (trimmedEmail === "") {
        return false;
    }

    // Regex for general email pattern
    const emailPattern = new RegExp(
        [
            // Start of string
            "^",

            // Local part: at least one character, dot, hyphen
            "[\\w.-]+",

            "@",

            // Domain: at least one letter, digit, dot, hyphen
            "[A-Za-z0-9.-]+",

            // Dot before TLD
            "\\.",

            // TLD: at least two letters
            "[A-Za-z]{2,}$",
        ].join(""),
        "u" // Unicode flag
    );

    return emailPattern.test(trimmedEmail);
};

export const isValidUserInput = (object: Object) => {
    // missing .name or .email fields
    if ("name" in object === false)
        return { success: false, error: "Missing name field" };
    if ("email" in object === false)
        return { success: false, error: "Missing email field" };

    const { name, email } = object;

    // fields are not a strings
    if (typeof name !== "string")
        return { success: false, error: "Field 'name' is not of type string" };

    if (typeof email !== "string")
        return { success: false, error: "Field 'email' is not of type string" };

    // mal-formatted name
    if (isValidName(name) === false)
        return { success: false, error: "Field 'name' is not a valid name" };

    // mal-formatted email
    if (isValidEmail(email) === false)
        return {
            success: false,
            error: "Field 'email' is not a valid email address",
        };

    return { success: true };
};
