import express from "express";
import analysis from "./analysis"
import statistics from "./statistics"
const router = express.Router();

router.use('/analysis', analysis);
router.use('/statistics', statistics)

export default router;