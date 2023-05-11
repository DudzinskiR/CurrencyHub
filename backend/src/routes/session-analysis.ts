import express from "express";
import SessionAnalysisController from "../modules/session-analysis/session-analysis.controller";
const router = express.Router();

router.get('/', SessionAnalysisController.getSessionAnalysis)

export default router;