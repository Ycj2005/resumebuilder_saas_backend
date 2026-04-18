import express from "express";
import { BASE_URL } from "./config/env.js";
import { GetDatabaseConnection } from "./DB/DB.js";
import UserRouter from "./routes/user.route.js";
import resumeRouter from "./routes/resume.route.js";
import subscribeRouter from "./routes/subscribe.route.js";
import resumeAnalyzerRouter from "./routes/resumeAnalyzer.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5500",
  "https://resumebuilder-saas-frontend.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

// No explicit app.options wildcard to avoid path-to-regexp '*' parser errors.
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/resume", resumeRouter);
app.use("/api/v1/users", subscribeRouter);
app.use("/api/v1/analyzer", resumeAnalyzerRouter);

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
