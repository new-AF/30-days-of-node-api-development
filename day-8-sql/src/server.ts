import express from "express";
import { PORT } from "@/config/environment";
import { userRouter } from "@/routes/user.route";
import { logRequest } from "./middleware/logRequest";
import { checkApiKey } from "./middleware/checkApiKey";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

// --- Middleware ----
// 1) Log every request
app.use(logRequest);

// 2) Convert request body to JSON
app.use(express.json());

// 3) Authorization
app.use(checkApiKey);

// 4) Controllers
app.use("/api/v1/users", userRouter);

// 5) Handle Errors
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(
        `🚀 Day 7: API Testing server running on http://localhost:${PORT}`
    );
});
