import express from "express";
import analysis from "./session-analysis"
import statistics from "./statistics"
import pair from "./pair"
const router = express.Router();

router.use('/session', analysis);
router.use('/statistics', statistics)
router.use('/pair', pair);

export default router;