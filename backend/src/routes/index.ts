import express from "express";
import analysis from "./session-analysis"
import statistics from "./statistics"
import change from "./change-distribution"
const router = express.Router();

router.use('/session', analysis);
router.use('/statistics', statistics)
router.use('/change', change);

export default router;