import express from "express";
import PairController from "../modules/pair/pair.controller";
const router = express.Router();

router.get('/', PairController.getPairDate)

export default router;