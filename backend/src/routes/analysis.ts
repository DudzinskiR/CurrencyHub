import express from "express";
import AnalysisController from "../modules/analysis/analysis.controller";
const router = express.Router();

router.get('/', AnalysisController.getAnalysis)

export default router;