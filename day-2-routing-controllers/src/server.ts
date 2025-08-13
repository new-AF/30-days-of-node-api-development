import express from "express";
import { PORT } from "@/config/environment";
import { testRouter } from "@/routes/test.route";
import { userRouter } from "@/routes/user.route";

const app = express();

app.use(express.json());

app.use("/api/v1/test", testRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
    console.log(`🚀 Day 2 server running on http://localhost:${PORT}`);
});
