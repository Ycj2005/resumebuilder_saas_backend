import express from "express";
import { BASE_URL } from "./config/env.js";
import { GetDatabaseConnection } from "./DB/DB.js";
import UserRouter from "./routes/user.route.js";
import resumeRouter from "./routes/resume.route.js";
import subscribeRouter from "./routes/subscribe.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/resume", resumeRouter);
app.use("/api/v1/users", subscribeRouter);

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.listen(BASE_URL, async () => {
  console.log("server is running... on port ", "http://localhost:" + BASE_URL);
  await GetDatabaseConnection();
});
