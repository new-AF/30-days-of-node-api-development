import express from "express";
import { PORT } from "@/config/environment";
import { userRouter } from "@/routes/user.route";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

// Register middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Day 5 server running on http://localhost:${PORT}`);
});
