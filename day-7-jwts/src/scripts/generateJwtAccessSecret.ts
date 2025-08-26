import crypto from "crypto";

// 32 random bytes, 64 length hex string, 256 bit key
const apiKey = crypto.randomBytes(32).toString("hex");

console.log(apiKey);
