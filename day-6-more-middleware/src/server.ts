import express from "express";
import { PORT } from "@/config/environment";
import { userRouter } from "@/routes/user.route";
import { logRequests } from "./middleware/logRequests";
import { checkApiKey } from "./middleware/checkApiKey";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// --- Middleware ----
// 1) Log every request
app.use(logRequests);

// 2) Convert request body to JSON
app.use(express.json());

// 3) Authorization
app.use(checkApiKey);

// 4) Controllers
app.use("/api/v1/users", userRouter);

// 5) Handle Errors
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Day 6 server running on http://localhost:${PORT}`);
});
