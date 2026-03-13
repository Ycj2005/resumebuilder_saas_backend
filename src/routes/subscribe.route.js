<<<<<<< HEAD
import { Router } from "express";
import authMiddleware from "../middleware/auth.js"; // <- add .js
import { createPayment } from "../controllers/subscription.logic.js"; // <- add .js

const subscribeRouter = Router();

subscribeRouter.post("/subscribe", authMiddleware, createPayment);

export default subscribeRouter;
=======
import { Router } from "express";
import authMiddleware from "../middleware/auth.js"; // <- add .js
import { createPayment } from "../controllers/subscription.logic.js"; // <- add .js

const subscribeRouter = Router();

subscribeRouter.post("/subscribe", authMiddleware, createPayment);

export default subscribeRouter;
>>>>>>> af2f786c9b95dbfa4ae119d5629c4ecc9c6181cc
