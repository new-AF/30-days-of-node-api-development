import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "@/server";

const getUsersWithoutApiKey = async () => {
    const response = await request(app).get("/api/v1/users");
    // unauthorized, missing api key
    expect(response.status).toBe(401);
};

const getUsersWitWrongApiKey = async () => {
    const response = await request(app)
        .get("/api/v1/users")
        .set("x-api-key", "my-dev-key");
    // unauthorized, wrong api key
    expect(response.status).toBe(401);
};

const getUsersWithApiKey = async () => {
    const response = await request(app)
        .get("/api/v1/users")
        .set("x-api-key", process.env.API_KEY);

    expect(response.status).toBe(200);
};

const runAllTests = () => {
    it("With API Key response status should be 200 OK", getUsersWithApiKey);
    it(
        "Without API Key response status should be 401 Error",
        getUsersWithoutApiKey
    );
    it(
        "Wrong API Key response status should be 401 Error",
        getUsersWitWrongApiKey
    );
};

describe("GET /api/v1/users", runAllTests);
