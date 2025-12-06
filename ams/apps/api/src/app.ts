import express from "express";
import cors from "cors";
import assetsRouter from "./routes/assets";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "AMS API is running" });
});

// Assets routes
app.use("/api/assets", assetsRouter);

export default app;
