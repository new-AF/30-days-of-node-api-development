import crypto from "crypto";

// 64 random bytes, 128 length hex string, 512 bit key
const apiKey = crypto.randomBytes(64).toString("hex");

console.log(apiKey);
