import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "@/server";

const cases = {};

// replace an existing user with valid fields
cases["valid fields, replaces existing user"] = async () => {
    const response = await request(app)
        .put("/api/v1/users/1")
        .set("x-api-key", process.env.API_KEY)
        .send({ name: "Alice Updated", email: "alice.updated@example.com" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body.name).toBe("Alice Updated");
    expect(response.body.email).toBe("alice.updated@example.com");
};

// missing name
cases["name missing, returns 400"] = async () => {
    const response = await request(app)
        .put("/api/v1/users/1")
        .set("x-api-key", process.env.API_KEY)
        .send({ email: "alice.updated@example.com" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
};

// invalid name
cases["invalid name, returns 400"] = async () => {
    const response = await request(app)
        .put("/api/v1/users/1")
        .set("x-api-key", process.env.API_KEY)
        .send({ name: "", email: "alice.updated@example.com" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
};

// missing email
cases["email missing, returns 400"] = async () => {
    const response = await request(app)
        .put("/api/v1/users/1")
        .set("x-api-key", process.env.API_KEY)
        .send({ name: "Alice Updated" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
};

// invalid email
cases["invalid email, returns 400"] = async () => {
    const response = await request(app)
        .put("/api/v1/users/1")
        .set("x-api-key", process.env.API_KEY)
        .send({ name: "Alice Updated", email: "alice.updated@example" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
};

// non-existent user
cases["user does not exist, returns 404"] = async () => {
    const response = await request(app)
        .put("/api/v1/users/9999")
        .set("x-api-key", process.env.API_KEY)
        .send({ name: "Ghost", email: "ghost@example.com" });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
};

// missing API key
cases["API key missing, returns 401"] = async () => {
    const response = await request(app)
        .put("/api/v1/users/1")
        .send({ name: "Alice Updated", email: "alice.updated@example.com" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
};

// top-level describe
describe("PUT /api/v1/users/:id", () =>
    Object.entries(cases).forEach(([caseName, testFunction]) =>
        it(caseName, testFunction)
    ));
