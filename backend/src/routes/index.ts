import express from "express";
import analysis from "./analysis"
const router = express.Router();

router.use('/analysis', analysis);

export default router;