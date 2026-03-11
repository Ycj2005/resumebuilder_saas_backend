import { Router } from "express";
import {
  createOrUpdateResume,
  getMyResume
} from "../controllers/resume.js";
import authMiddleware from "../middleware/auth.js";
import subscriptionMiddleware from "../middleware/subscription.js";

const resumeRouter = Router();

// subscriptionMiddleware,
resumeRouter.post(
  "/create",
  authMiddleware,
  createOrUpdateResume,
);
resumeRouter.get(
  "/get",
  authMiddleware,
  getMyResume,
);
// subscriptionMiddleware,

export default resumeRouter;
