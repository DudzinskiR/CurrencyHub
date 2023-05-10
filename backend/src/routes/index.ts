import express from "express";
import analysis from "./analysis"
import statistics from "./statistics"
import pair from "./pair"
const router = express.Router();

router.use('/analysis', analysis);
router.use('/statistics', statistics)
router.use('/pair', pair);

export default router;