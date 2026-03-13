<<<<<<< HEAD
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
=======
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
>>>>>>> af2f786c9b95dbfa4ae119d5629c4ecc9c6181cc
