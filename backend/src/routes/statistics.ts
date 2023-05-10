import express from "express";
import analysis from "./analysis"
import StatisticsController from "../modules/statistics/statistics.controller";
const router = express.Router();

router.get('/', StatisticsController.getStatistics);

export default router;