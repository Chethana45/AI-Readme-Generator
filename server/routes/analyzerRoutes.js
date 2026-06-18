import express from "express";
import { analyzeRepository } from "../controllers/analyzerController.js";

const router = express.Router();

router.post("/analyze", analyzeRepository);

export default router;