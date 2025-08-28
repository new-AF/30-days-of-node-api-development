import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "@/server";

const cases = {};

// valid name only
cases["valid name only, updates user"] = async () => {
    const response = await request(app)
        .patch("/api/v1/users/1")
        .set("x-api-key", process.env.API_KEY)
        .send({ name: "Alice Patched" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body.name).toBe("Alice Patched");
};

// valid email only
cases["valid email only, updates user"] = async () => {
    const response = await request(app)
        .patch("/api/v1/users/1")
        .set("x-api-key", process.env.API_KEY)
        .send({ email: "patched@example.com" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body.email).toBe("patched@example.com");
};

// valid name and email together
cases["valid name and email, updates user"] = async () => {
    const response = await request(app)
        .patch("/api/v1/users/1")
        .set("x-api-key", process.env.API_KEY)
        .send({ name: "Alice Both", email: "alice.both@example.com" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body.name).toBe("Alice Both");
    expect(response.body.email).toBe("alice.both@example.com");
};

// invalid email format
cases["invalid email format, returns 400"] = async () => {
    const response = await request(app)
        .patch("/api/v1/users/1")
        .set("x-api-key", process.env.API_KEY)
        .send({ email: "not-an-email" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
};

// invalid name
cases["invalid name, returns 400"] = async () => {
    const response = await request(app)
        .patch("/api/v1/users/1")
        .set("x-api-key", process.env.API_KEY)
        .send({ name: "" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
};

// user does not exist
cases["user does not exist, returns 404"] = async () => {
    const response = await request(app)
        .patch("/api/v1/users/9999")
        .set("x-api-key", process.env.API_KEY)
        .send({ name: "Nobody" });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
};

// missing API key
cases["API key missing, returns 401"] = async () => {
    const response = await request(app)
        .patch("/api/v1/users/1")
        .send({ name: "Alice Unauthorized" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
};

// top-level describe
describe("PATCH /api/v1/users/:id", () =>
    Object.entries(cases).forEach(([caseName, testFunction]) =>
        it(caseName, testFunction)
    ));
