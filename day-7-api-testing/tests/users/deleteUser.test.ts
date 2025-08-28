import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "@/server";

const cases = {};

// delete an existing user
cases["existing user, deletes successfully"] = async () => {
    const response = await request(app)
        .delete("/api/v1/users/1")
        .set("x-api-key", process.env.API_KEY);

    expect(response.status).toBe(204); // no content
    expect(response.body).toEqual({});
};

// confirm user is deleted
cases["confirm user with id has been deleted"] = async () => {
    const response = await request(app)
        .get("/api/v1/users/1")
        .set("x-api-key", process.env.API_KEY);

    expect(response.status).toBe(404);
};

// user does not exist
cases["user does not exist, returns 404"] = async () => {
    const response = await request(app)
        .delete("/api/v1/users/9999")
        .set("x-api-key", process.env.API_KEY);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
};

// missing API key
cases["API key missing, returns 401"] = async () => {
    const response = await request(app).delete("/api/v1/users/1");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
};

// invalid user id (not numeric)
cases["invalid user id  (not numeric), returns 400"] = async () => {
    const response = await request(app)
        .delete("/api/v1/users/abc")
        .set("x-api-key", process.env.API_KEY);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
};

// top-level describe
describe("DELETE /api/v1/users/:id", () =>
    Object.entries(cases).forEach(([caseName, testFunction]) =>
        it(caseName, testFunction)
    ));
