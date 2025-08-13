import { Router } from "express";
import { getTestMessage } from "@/controllers/test.controller";

// In src/server.ts we will mount /api/v1/test to testRouter
export const testRouter = Router();

// GET /api/test
testRouter.get("/", getTestMessage);
