import express from "express";
import { PORT } from "@/config/environment";

const app = express();

// Middleware: Parse JSON request bodies
app.use(express.json());

// Health check route
app.get("/api/v1/health", (request, response) => {
    response.status(200);
    response.json({
        status: "ok",
    });
});

// Start server on configured port
app.listen(PORT, () => {
    console.log(`🚀 server running on http://localhost:${PORT}`);
});
