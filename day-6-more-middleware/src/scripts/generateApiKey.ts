import crypto from "crypto";

// 32 random bytes, 128 length string
const apiKey = crypto.randomBytes(32).toString("hex");

console.log(apiKey);
