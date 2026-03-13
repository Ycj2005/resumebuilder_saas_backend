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

const allowedOrigins = [
  "*",
  "http://localhost:3000",
  "https://resumebuilder-saas-frontend-2qwxpfkqp-yash-jadhavs-projects.vercel.app",
];

app.use(
  cors({
    origin: "https://resumebuilder-saas-frontend-2qwxpfkqp-yash-jadhavs-projects.vercel.app",
    credentials: true,
  }),
);

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/resume", resumeRouter);
app.use("/api/v1/users", subscribeRouter);

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.listen(BASE_URL, "0.0.0.0", async () => {
  console.log(
    "server is running... on port ",
    "http:// 192.168.1.6:" + BASE_URL,
  );
  await GetDatabaseConnection();
});
