import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "@/server";

// all our test cases to be iterated through
const cases = {};

// create a user with valid fields
cases["creates valid user, returns 200"] = async () => {
    const response = await request(app)
        .post("/api/v1/users")
        .set("x-api-key", process.env.API_KEY)
        .send({ name: "Alice", email: "alice@example.com" });

    // resource created
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Alice");
    expect(response.body.email).toBe("alice@example.com");
};

// try create a user with missing name
cases["missing name field, returns 400"] = async () => {
    const response = await request(app)
        .post("/api/v1/users")
        .set("x-api-key", process.env.API_KEY)
        .send({ email: "bob@example.com" });

    // bad request email missing
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
};

// try create a user with missing email
cases["missing email field, returns 400"] = async () => {
    const response = await request(app)
        .post("/api/v1/users")
        .set("x-api-key", process.env.API_KEY)
        .send({ name: "Bob" });

    // bad request email missing
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
};

// try create a user with invalid email format
cases["invalid email, returns 400"] = async () => {
    const response = await request(app)
        .post("/api/v1/users")
        .set("x-api-key", process.env.API_KEY)
        .send({ name: "Charlie", email: "not-an-email" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
};

// try create a user with invalid name format
cases["invalid name, returns 400"] = async () => {
    const response = await request(app)
        .post("/api/v1/users")
        .set("x-api-key", process.env.API_KEY)
        .send({ name: "", email: "alice@example.com" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
};

// top-level describe
describe("POST /api/v1/users", () =>
    Object.entries(cases).forEach(([caseName, testFunction]) =>
        it(caseName, testFunction)
    ));
