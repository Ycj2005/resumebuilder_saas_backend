import express from "express";
import multer from "multer";
import { analyzeResume } from "../controllers/resumeAnalyzer.controller.js";

const router = express.Router();

// Configure multer to store files in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});

router.post("/analyze", upload.single("resume"), analyzeResume);

export default router;
