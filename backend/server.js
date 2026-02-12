import express from "express";
import cors from "cors";
import "dotenv/config";

import tasksRouter from "./routes/tasks.router.js";
import { error } from "./middleware/response.middleware.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use('/', tasksRouter);

app.use((err, req, res, next) => {
    error(err, res);
})

const PORT = 4000;
app.listen(PORT, async () => {
    console.log(`API running on http://localhost:${PORT}`);
});