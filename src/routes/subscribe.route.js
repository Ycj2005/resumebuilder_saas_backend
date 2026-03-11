import { Router } from "express";
import authMiddleware from "../middleware/auth.js"; // <- add .js
import { createPayment } from "../controllers/subscription.logic.js"; // <- add .js

const subscribeRouter = Router();

subscribeRouter.post("/subscribe", authMiddleware, createPayment);

export default subscribeRouter;
